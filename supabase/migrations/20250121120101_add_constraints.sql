alter table "public"."user_card_scheduled" alter column "new_difficulty" drop default;

alter table "public"."user_card_scheduled" alter column "new_stability" set not null;

alter table "public"."user_card_scheduled" alter column "review_time_score" set not null;

CREATE UNIQUE INDEX uid_card ON public.user_card USING btree (uid, phrase_id);

CREATE UNIQUE INDEX uid_deck ON public.user_deck USING btree (uid, lang);
