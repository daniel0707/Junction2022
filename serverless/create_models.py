from omymodels import create_models
ddl="""
-- public.recyclepoint definition

-- Drop table

-- DROP TABLE public.recyclepoint;

CREATE TABLE public.recyclepoint (
	address varchar NULL,
	coordinates _point NULL,
	spot_name varchar NULL,
	municipality varchar NULL,
	postal_code numeric NULL,
	id numeric NOT NULL,
	CONSTRAINT recyclepoint_pk PRIMARY KEY (id)
);
CREATE INDEX recyclepoint_coordinates_idx ON public.recyclepoint USING btree (coordinates);


-- public.material definition

-- Drop table

-- DROP TABLE public.material;

CREATE TABLE public.material (
	id numeric NOT NULL,
	name_fi varchar NULL,
	name_en varchar NULL,
	CONSTRAINT material_pk PRIMARY KEY (id)
);


-- public.recyclepoint_material definition

-- Drop table

-- DROP TABLE public.recyclepoint_material;

CREATE TABLE public.recyclepoint_material (
	fk_recyclepoint numeric NULL,
	fk_material numeric NULL,
	CONSTRAINT newtable_fk FOREIGN KEY (fk_recyclepoint) REFERENCES public.recyclepoint(id) ON UPDATE CASCADE,
	CONSTRAINT newtable_fk_1 FOREIGN KEY (fk_material) REFERENCES public.material(id) ON UPDATE CASCADE
);
"""

result = create_models(ddl, models_type='sqlalchemy')['code']