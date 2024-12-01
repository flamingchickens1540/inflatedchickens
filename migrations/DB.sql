CREATE TYPE tele_action_type AS ENUM (
    'IntakeTote', 
    'IntakeBalloon', 
    'TakeBalloonFromCoral', 
    
    'ScoreYourHeldTote', 
    'ScoreOtherHeldTote', 
    'ScoreExternalTote', 
    'ScoreLowBalloon'
);
CREATE TYPE auto_action_type as ENUM (
    'IntakeTote', 
    'IntakeBalloon', 
    'TakeBalloonFromCoral', 
    
    'ScoreYourHeldTote', 
    'ScoreOtherHeldTote', 
    'ScoreExternalTote', 
    'ScoreLowBalloon'

    'IntakeBunny',
	'ScoreBunnyTote',
	'ScoreBunnyLowZone'
);
CREATE TYPE tele_action_data AS (
    act tele_action_type,
    success BOOLEAN
);
CREATE TYPE auto_action_data AS (
    act auto_action_type,
    success BOOLEAN
);

CREATE TABLE "Users"(
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "is_admin" BOOLEAN NOT NULL,
    "slack_token" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "Users" ADD PRIMARY KEY("id");
CREATE TABLE "EventState"(
    "event_key" VARCHAR(255) NOT NULL,
    "next_match" VARCHAR(255) NULL,
    "last_match" VARCHAR(255) NULL
);
ALTER TABLE
    "EventState" ADD PRIMARY KEY("event_key");
CREATE TABLE "Teams"("team_key" SMALLINT NOT NULL);
ALTER TABLE
    "Teams" ADD PRIMARY KEY("team_key");
CREATE TABLE "Matches"(
    "match_key" VARCHAR(255) NOT NULL,
    "event_key" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "Matches" ADD PRIMARY KEY("match_key");
CREATE TABLE "TeamMatches"(
    "team_action_id" BIGINT NOT NULL,
    "scout_id" VARCHAR(255) NOT NULL,
    "match_key" VARCHAR(255) NOT NULL,
    "team_key" VARCHAR(255) NOT NULL,
    "skill_field_awareness" SMALLINT NOT NULL,
    "skill_quickness" SMALLINT NOT NULL,
    "notes" TEXT NOT NULL,
    "broke" BOOLEAN NOT NULL,
    "died" BOOLEAN NOT NULL,
    "tele_id" SMALLINT NOT NULL,
    "auto_id" SMALLINT NOT NULL
);
ALTER TABLE
    "TeamMatches" ADD PRIMARY KEY("team_action_id");
CREATE TABLE "TeleActions"(
    "id" SMALLINT NOT NULL,
    "tote_intake_success" SMALLINT NOT NULL,
    "tote_intake_failure" SMALLINT NOT NULL,
    "tote_eject_success" SMALLINT NOT NULL,
    "tote_eject_failure" SMALLINT NOT NULL,
    "balloon_intake_success" SMALLINT NOT NULL,
    "balloon_intake_failure" SMALLINT NOT NULL,
    "balloon_eject_success" SMALLINT NOT NULL,
    "balloon_eject_failure" SMALLINT NOT NULL,
    "score_low_success" SMALLINT NOT NULL,
    "score_low_failure" SMALLINT NOT NULL,
    "score_internal_success" SMALLINT NOT NULL,
    "score_internal_failure" SMALLINT NOT NULL,
    "score_external_success" SMALLINT NOT NULL,
    "score_external_failure" SMALLINT NOT NULL,
    "score_uncontrolled_success" SMALLINT NOT NULL,
    "score_uncontrolled_failure" SMALLINT NOT NULL,
    "bunny_eject_success" SMALLINT NOT NULL,
    "bunny_eject_failure" SMALLINT NOT NULL,
    "actions" tele_action_data[]
);
ALTER TABLE
    "TeleActions" ADD PRIMARY KEY("id");
CREATE TABLE "AutoActions"(
    "id" SMALLINT NOT NULL,
    "tote_intake_success" SMALLINT NOT NULL,
    "tote_intake_failure" SMALLINT NOT NULL,
    "tote_eject_success" SMALLINT NOT NULL,
    "tote_eject_failure" SMALLINT NOT NULL,
    "balloon_intake_success" SMALLINT NOT NULL,
    "balloon_intake_failure" SMALLINT NOT NULL,
    "balloon_eject_success" SMALLINT NOT NULL,
    "balloon_eject_failure" SMALLINT NOT NULL,
    "score_low_success" SMALLINT NOT NULL,
    "score_low_failure" SMALLINT NOT NULL,
    "score_internal_sucess" SMALLINT NOT NULL,
    "score_internal_failure" SMALLINT NOT NULL,
    "score_external_success" SMALLINT NOT NULL,
    "score_external_failure" SMALLINT NOT NULL,
    "score_uncontrolled_success" SMALLINT NOT NULL,
    "score_uncontrolled_failure" SMALLINT NOT NULL,
    "bunny_intake_success" SMALLINT NOT NULL,
    "bunny_intake_failure" SMALLINT NOT NULL,
    "bunny_intake_success" SMALLINT NOT NULL,
    "bunny_intake_failure" SMALLINT NOT NULL,
    "bunny_tote_success" SMALLINT NOT NULL,
    "bunny_tote_failure" SMALLINT NOT NULL,
    "bunny_low_success" SMALLINT NOT NULL,
    "bunny_low_failure" SMALLINT NOT NULL,
    "actions" auto_action_data[]
);
ALTER TABLE
    "AutoActions" ADD PRIMARY KEY("id");
ALTER TABLE
    "TeamMatches" ADD CONSTRAINT "teammatches_team_key_foreign" FOREIGN KEY("team_key") REFERENCES "Teams"("team_key");
ALTER TABLE
    "TeamMatches" ADD CONSTRAINT "teammatches_match_key_foreign" FOREIGN KEY("match_key") REFERENCES "Matches"("match_key");
ALTER TABLE
    "TeamMatches" ADD CONSTRAINT "teammatches_scout_id_foreign" FOREIGN KEY("scout_id") REFERENCES "Users"("id");
ALTER TABLE
    "Matches" ADD CONSTRAINT "matches_event_key_foreign" FOREIGN KEY("event_key") REFERENCES "EventState"("event_key");
ALTER TABLE
    "TeamMatches" ADD CONSTRAINT "teammatches_auto_id_foreign" FOREIGN KEY("auto_id") REFERENCES "AutoActions"("id");
ALTER TABLE
    "TeamMatches" ADD CONSTRAINT "teammatches_tele_id_foreign" FOREIGN KEY("tele_id") REFERENCES "TeleActions"("id");