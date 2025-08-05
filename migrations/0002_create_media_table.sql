
create table media (
  name text primary key,
  url text not null,
  alt_text text,
  created_at timestamptz not null default now()
);
