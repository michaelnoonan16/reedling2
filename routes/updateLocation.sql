

update location set parent_id=(select id from location where name='Co. Wexford') where name in ('The Cull','Carnsore','Ladies Island',
                                                            'North Slob','Roslare Back Stran','South Slob','Hook Head','Tacumshin');



 	

update location set parent_id=(select id from location where name='Co. Wicklow') where name in ('Bray','Broad Lough','Greystones',
                                                            'Wicklow Head','Roundwood','Kilcoole');




update location set parent_id=(select id from location where name='Co. Dublin')  where name in 
('Bull Island','Cabinteely Park','Dalkey','Marley Park','Rogerstown','Stepaside Area','Tallaght','Glenageary','Swords','West Pier/ DunL');





