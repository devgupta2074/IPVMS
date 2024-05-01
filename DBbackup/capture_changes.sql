CREATE OR REPLACE FUNCTION public.capture_changes()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
DECLARE 
-- 	js_new jsonb := 
-- Assuming js_new is declared as jsonb type
js_new jsonb := (
    SELECT jsonb_object_agg(p2.key, p2.value)
    FROM jsonb_each(to_jsonb(old)) AS p1(key, value)
    JOIN jsonb_each(to_jsonb(new)) AS p2(key, value) 
    ON p1.key = p2.key
    WHERE p1.value IS DISTINCT FROM p2.value
	AND p1.key <> 'htmldata'
    AND p2.key <> 'htmldata'
);
js_old jsonb := (
    SELECT jsonb_object_agg(p1.key, p1.value)
    FROM jsonb_each(to_jsonb(old)) AS p1(key, value)
    JOIN jsonb_each(to_jsonb(new)) AS p2(key, value) 
    ON p2.key = p1.key
    WHERE p2.value IS DISTINCT FROM p1.value
	AND p1.key <> 'htmldata'
    AND p2.key <> 'htmldata'
);

changed_columns text[] := ARRAY(SELECT jsonb_object_keys(js_new) as keys);

begin
if tg_op = 'UPDATE' then
insert into audit (table_name, user_name, action, old_values, new_values, query, row_PK_id,columns_changed)
values (tg_table_name::text, NEW.updated_by, 'update', js_old, js_new,
 TRIM(current_query()), OLD.id, changed_columns);
return new;
elsif tg_op = 'DELETE' then
insert into audit (table_name, user_name, action, old_values, new_values, query, row_PK_id,columns_changed)
values (tg_table_name::text, OLD.updated_by, 'delete', js_old,js_new, TRIM(current_query()), OLD.id,changed_columns);
return old;
elsif tg_op = 'INSERT' then
insert into audit (table_name, user_name, action,old_values, new_values, query,row_PK_id, columns_changed)
values (tg_table_name::text, NEW.created_by, 'insert', js_old, js_new, TRIM(current_query()), NEW.id,changed_columns);
return new;
end if;
end;
$function$
;

