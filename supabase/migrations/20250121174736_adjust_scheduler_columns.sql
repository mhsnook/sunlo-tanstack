alter table "public"."user_card_scheduled" add column "score" smallint not null;
UPDATE "public"."user_card_scheduled" SET "score" = "review_time_score"
alter table "public"."user_card_scheduled" drop constraint "user_card_scheduled_review_time_score_check";
alter table "public"."user_card_scheduled" drop column "review_time_score";


alter table "public"."user_card_scheduled" add column "prev_id" uuid;
UPDATE "public"."user_card_scheduled" SET "prev_id" = "last_user_card_schedule_id";
alter table "public"."user_card_scheduled" drop column "last_user_card_schedule_id";


alter table "public"."user_card_scheduled" add column "user_deck_id" uuid;
UPDATE "public"."user_card_scheduled"
	SET "user_deck_id" = c.user_deck_id 
	FROM "public"."user_card" AS c
	WHERE user_card_id = c.id;
