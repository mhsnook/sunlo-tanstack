alter table "public"."user_card_scheduled" add constraint "user_card_scheduled_score_check" CHECK ((score = ANY (ARRAY[1, 2, 3, 4]))) not valid;
alter table "public"."user_card_scheduled" validate constraint "user_card_scheduled_score_check";

alter table "public"."user_card_scheduled" add constraint "user_card_scheduled_review_time_difficulty_check" CHECK (((review_time_difficulty >= 0.0) AND (review_time_difficulty <= 10.0))) not valid;
alter table "public"."user_card_scheduled" validate constraint "user_card_scheduled_review_time_difficulty_check";

alter table "public"."user_card_scheduled" add constraint "user_card_scheduled_review_time_stability_check" CHECK ((review_time_stability >= 0.0)) not valid;
alter table "public"."user_card_scheduled" validate constraint "user_card_scheduled_review_time_stability_check";

alter table "public"."user_card_scheduled" add constraint "user_card_scheduled_user_deck_id_fkey" FOREIGN KEY (user_deck_id) REFERENCES user_deck(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;
alter table "public"."user_card_scheduled" validate constraint "user_card_scheduled_user_deck_id_fkey";
