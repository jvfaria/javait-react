CREATE TABLE IF NOT EXISTS challenges (
    id serial primary key,
    type varchar(256) not null,
    description varchar(256) not null,
    amount integer not null,
    code text[] not null,
    choices text not null,
    answer char not null,
    explanation varchar(256) not null
);