-- id 				 -- default
-- uid 				 -- default
-- created_at  -- default
-- review_time_score 					-- argument
-- review_time_retrievability -- argument
-- last_user_card_schedule_id -- argument
-- user_card_id 					-- retrieve
-- review_time_difficulty -- retrieve
-- review_time_stability  -- retrieve
-- new_difficulty 	-- calculate
-- new_stability		-- calculate
-- new_interval_r90 -- calculate
-- scheduled_for 		-- calculate

CREATE OR REPLACE FUNCTION record_review_and_schedule(
		user_card_id uuid,
		review_time_retrievability numeric,
    review_time_score numeric
		-- , new_interval_r90 numeric
) RETURNS TIMESTAMP AS $$
DECLARE
		this_is_the_first_time BOOLEAN;
		desired_retention NUMERIC := 0.9;
    last_user_card_schedule_id uuid; --
		review_time_difficulty NUMERIC; -- 
		review_time_stability NUMERIC; --
		new_difficulty NUMERIC;
		new_stability NUMERIC;
		new_interval_r90 NUMERIC;
		scheduled_for TIMESTAMP;
    
BEGIN
    -- is this the first time or no 
    SELECT NOT EXISTS(
        SELECT 1 FROM public.user_card_scheduled s 
        WHERE s.user_card_id = record_review_and_schedule.user_card_id
    ) INTO this_is_the_first_time;

		-- get the previous review/scheduling record
    IF this_is_the_first_time
		THEN 
			last_user_card_schedule_id := NULL; 
			review_time_difficulty := NULL;
			review_time_stability := NULL;
		ELSE
			SELECT 
				last_user_card_schedule_id, new_difficulty, new_stability
			INTO 
				last_user_card_schedule_id, review_time_difficulty, review_time_stability 		
			FROM public.user_card_scheduled AS s
			WHERE s.user_card_id = record_review_and_schedule.user_card_id
			ORDER BY s.created_at DESC
			LIMIT 1;
		END IF;

		-- 1. calculate New Stability
		IF this_is_the_first_time
		THEN
			new_stability := fsrs_s_0(review_time_score);
		ELSE
			new_stability := fsrs_stability(
				review_time_difficulty,
    		review_time_stability,
    		review_time_retrievability,
    		review_time_score
			);
		END IF;

		-- 2. update difficulty		
		IF this_is_the_first_time
		THEN
    	new_difficulty := fsrs_d_0(review_time_score);
		ELSE
			new_difficulty := fsrs_difficulty(review_time_difficulty, review_time_score);
		END IF;

		-- 3. calculate retention interval
		new_interval_r90 := fsrs_interval(desired_retention, new_stability);
		scheduled_for := NOW() + new_interval_r90;

	
  	-- properties of the scheduling record to create
		INSERT INTO public.user_card_scheduled (
			user_card_id, --
			last_user_card_schedule_id,
			review_time_difficulty,
			review_time_stability,
			review_time_retrievability,
			review_time_score,
			new_difficulty,
			new_stability,
			new_interval_r90,
			scheduled_for
		)
		VALUES (
			user_card_id, --
			last_user_card_schedule_id, --
			review_time_difficulty, --
			review_time_stability, --
			review_time_retrievability, --
			review_time_score, --
			new_difficulty, --
			new_stability,
			new_interval_r90,
			scheduled_for
		);

    RETURN scheduled_for;
END;
$$ LANGUAGE plpgsql;