create index idx_location_country on location (country_id)

create index idx_country_name on country (name)

create index idx_observation_date on observation (date)

create index idx_observation_taxon on observation (taxon_id)

create index idx_taxon_commonname on taxon (commonname)

create index idx_location_name on location (name)

 create index idx_sitevisit_id on sitevisit (id)

 create index idx_observation_id on observation (id)