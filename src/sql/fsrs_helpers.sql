-- Translated from https://borretti.me/article/implementing-fsrs-in-100-lines

CREATE OR REPLACE FUNCTION fsrs_retrievability(time_in_days numeric, stability numeric) 
RETURNS numeric AS $$
DECLARE
    f numeric := 19.0 / 81.0;
    c numeric := -0.5;
BEGIN
    RETURN (1.0 + f * (time_in_days / stability)) ^ c;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION fsrs_interval(desired_retrievability numeric, stability numeric) 
RETURNS numeric AS $$
DECLARE
    f numeric := 19.0 / 81.0;
    c numeric := -0.5;
BEGIN
    RETURN (stability / f) * ((desired_retrievability ^ (1.0 / c)) - 1.0);
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION fsrs_s_0(
    score INTEGER
)
RETURNS numeric AS $$
DECLARE
	W NUMERIC[] := ARRAY[
		0.40255,
		1.18385,
		3.173,
		15.69105
	];
BEGIN
    RETURN W[score];
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION fsrs_s_fail(
    difficulty numeric,
    stability numeric,
    review_time_retrievability numeric
)
RETURNS numeric AS $$
DECLARE
	W_11 numeric := 1.9395;
	W_12 numeric := 0.11;
	W_13 numeric := 0.29605;
	W_14 numeric := 2.2698;
    d_f numeric;
    s_f numeric;
    r_f numeric;
    c_f numeric;
BEGIN
    d_f := difficulty ^ (-W_12);
    s_f := ((stability + 1.0) ^ W_13) - 1.0;
    r_f := exp(W_14 * (1.0 - review_time_retrievability));
    c_f := W_11;
    s_f := d_f * s_f * r_f * c_f;
    RETURN least(s_f, stability);
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION fsrs_s_success(
    difficulty numeric,
    stability numeric,
    review_time_retrievability numeric,
    score INTEGER
)
RETURNS numeric AS $$
DECLARE
    W_8 numeric := 1.54575;
	W_9 numeric := 0.1192;
	W_10 numeric := 1.01925;
	W_15 numeric := 0.2315;
	W_16 numeric := 2.9898;
	t_d numeric;
    t_s numeric;
    t_r numeric;
    h numeric;
    b numeric;
    c numeric;
    alpha numeric;
BEGIN
    t_d := 11.0 - difficulty;
    t_s := stability ^ (-W_9);
    t_r := exp(W_10 * (1.0 - review_time_retrievability)) - 1.0;
    IF score = 2 THEN  -- "HARD"
        h := W_15;
    ELSE
        h := 1.0;
    END IF;
    IF score = 4 THEN  -- "EASY"
        b := W_16;
    ELSE
        b := 1.0;
    END IF;
    c := exp(W_8);
    alpha := 1.0 + t_d * t_s * t_r * h * b * c;
    RETURN stability * alpha;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION fsrs_stability(
    difficulty numeric,
    stability numeric,
    review_time_retrievability numeric,
    score INTEGER
)
RETURNS numeric AS $$
BEGIN
    IF score = 1 THEN
		RETURN fsrs_s_fail(difficulty, stability, review_time_retrievability);
		ELSE RETURN fsrs_s_success(difficulty, stability, review_time_retrievability, score);
		END IF;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION fsrs_d_0(score INTEGER) 
RETURNS numeric AS $$
DECLARE
    W_4 numeric := 7.1949;
    W_5 numeric := 0.5345;
BEGIN
    RETURN fsrs_clamp_d(
			W_4 - exp(W_5 * (score::numeric - 1.0)) + 1.0
		);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION fsrs_clamp_d(difficulty numeric) 
RETURNS numeric AS $$
BEGIN
    RETURN greatest(least(difficulty, 10.0), 1.0);
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION fsrs_difficulty(difficulty numeric, score INTEGER) 
RETURNS numeric AS $$
DECLARE
	W_7 numeric := 0.0046;
BEGIN
    RETURN fsrs_clamp_d(W_7 * fsrs_d_0(4) + (1.0 - W_7) * fsrs_dp(difficulty, score));
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION fsrs_dp(difficulty numeric, score INTEGER) 
RETURNS numeric AS $$
DECLARE
BEGIN
    RETURN difficulty + fsrs_delta_d(score) * ((10.0 - difficulty) / 9.0);
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION fsrs_delta_d(score INTEGER) 
RETURNS numeric AS $$
DECLARE
	W_6 numeric := 1.4604;
BEGIN
    RETURN -W_6 * (score::numeric - 3.0);
END;
$$ LANGUAGE plpgsql;
