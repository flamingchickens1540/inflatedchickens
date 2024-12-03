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
CREATE TYPE drivetrain_enum as ENUM (
    'Swerve',
    'Tank',
    'Other'
);

CREATE TABLE "Users"(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "is_admin" BOOLEAN NOT NULL
);
CREATE TABLE "Teams"(
    "team_key" VARCHAR(255) NOT NULL,
    "nickname" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "Teams" ADD PRIMARY KEY("team_key");
CREATE TABLE "Matches"(
    "match_key" VARCHAR(255) NOT NULL,
    "event_key" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "Matches" ADD PRIMARY KEY("match_key");
CREATE TABLE "TeamMatches"(
    "id" SERIAL PRIMARY KEY,
    "scout_id" SMALLINT NOT NULL,
    "match_key" VARCHAR(255) NOT NULL,
    "team_key" VARCHAR(255) NOT NULL,
    "skill_field_awareness" SMALLINT NOT NULL,
    "skill_quickness" SMALLINT NOT NULL,
    "notes" TEXT NOT NULL,
    "broke" BOOLEAN NOT NULL,
    "died" BOOLEAN NOT NULL,
    "tele_action_id" SMALLINT NOT NULL,
    "auto_action_id" SMALLINT NOT NULL
);
CREATE TABLE "TeleActions"(
    "id" SERIAL PRIMARY KEY,
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
    "actions" tele_action_data[] NOT NULL
);
CREATE TABLE "AutoActions"(
    "id" SERIAL PRIMARY KEY,
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
    "bunny_eject_success" SMALLINT NOT NULL,
    "bunny_eject_failure" SMALLINT NOT NULL,
    "bunny_tote_success" SMALLINT NOT NULL,
    "bunny_tote_failure" SMALLINT NOT NULL,
    "bunny_low_success" SMALLINT NOT NULL,
    "bunny_low_failure" SMALLINT NOT NULL,
    "actions" auto_action_data[] NOT NULL
);
CREATE TABLE "AllianceMatches"(
    "id" SERIAL PRIMARY KEY,
    "scout_id" SMALLINT NOT NULL,
    "match_key" VARCHAR(255) NOT NULL,
    "alliance_key" VARCHAR(255) NOT NULL,
    "one_strengths" VARCHAR(255) NOT NULL,
    "two_strengths" VARCHAR(255) NOT NULL,
    "three_strengths" VARCHAR(255) NOT NULL,
    "one_weaknesses" VARCHAR(255) NOT NULL,
    "two_weaknesses" VARCHAR(255) NOT NULL,
    "three_weaknesses" VARCHAR(255) NOT NULL,
    "notes" VARCHAR(255) NOT NULL,
    "match_notes" VARCHAR(255) NOT NULL
);
CREATE TABLE "TeamEvents"(
    "id" SERIAL PRIMARY KEY,
    "scout_id" SMALLINT NOT NULL,
    "team_key" VARCHAR(255) NOT NULL,
    "width" SMALLINT NOT NULL,
    "length" SMALLINT NOT NULL,
    "height" SMALLINT NOT NULL,
    "is_camera" BOOLEAN NOT NULL,
    "drivetrain_enum" drivetrain_enum NOT NULL,
    "is_slippery" BOOLEAN NOT NULL,
    "is_tote_intake" BOOLEAN NOT NULL,
    "is_balloon_intake" BOOLEAN NOT NULL,
    "number_bunny_autos" SMALLINT NOT NULL,
    "polish" SMALLINT NOT NULL,
    "robot_notes" VARCHAR(255) NOT NULL,
    "minibot_notes" SMALLINT NOT NULL
);
ALTER TABLE
    "TeamEvents" ADD CONSTRAINT "teamevents_scout_id_foreign" FOREIGN KEY("scout_id") REFERENCES "Users"("id");
ALTER TABLE
    "AllianceMatches" ADD CONSTRAINT "alliancematches_match_key_foreign" FOREIGN KEY("match_key") REFERENCES "Matches"("match_key");
ALTER TABLE
    "TeamMatches" ADD CONSTRAINT "teammatches_team_key_foreign" FOREIGN KEY("team_key") REFERENCES "Teams"("team_key");
ALTER TABLE
    "TeamMatches" ADD CONSTRAINT "teammatches_match_key_foreign" FOREIGN KEY("match_key") REFERENCES "Matches"("match_key");
ALTER TABLE
    "TeamMatches" ADD CONSTRAINT "teammatches_scout_id_foreign" FOREIGN KEY("scout_id") REFERENCES "Users"("id");
ALTER TABLE
    "TeamMatches" ADD CONSTRAINT "teammatches_auto_id_foreign" FOREIGN KEY("auto_action_id") REFERENCES "AutoActions"("id");
ALTER TABLE
    "TeamEvents" ADD CONSTRAINT "teamevents_team_key_foreign" FOREIGN KEY("team_key") REFERENCES "Teams"("team_key");
ALTER TABLE
    "TeamMatches" ADD CONSTRAINT "teammatches_tele_id_foreign" FOREIGN KEY("tele_action_id") REFERENCES "TeleActions"("id");
ALTER TABLE
    "AllianceMatches" ADD CONSTRAINT "alliancematches_scout_id_foreign" FOREIGN KEY("scout_id") REFERENCES "Users"("id");