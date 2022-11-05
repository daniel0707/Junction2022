import sqlalchemy as sa
from sqlalchemy.ext.declarative import declarative_base
from geoalchemy2 import Geography

Base = declarative_base()


class Recyclepoint(Base):

    __tablename__ = 'recyclepoint'

    address = sa.Column(sa.String())
    coordinates = sa.Column(Geography(geometry_type='POINT',srid=4326))
    spot_name = sa.Column(sa.String())
    municipality = sa.Column(sa.String())
    postal_code = sa.Column(sa.Numeric())
    id = sa.Column(sa.Numeric(), primary_key=True)


class Material(Base):

    __tablename__ = 'material'

    id = sa.Column(sa.Numeric(), primary_key=True)
    name_fi = sa.Column(sa.String())
    name_en = sa.Column(sa.String())


class RecyclepointMaterial(Base):

    __tablename__ = 'recyclepoint_material'
    fk_recyclepoint = sa.Column(sa.Numeric(),primary_key=True)
    fk_material = sa.Column(sa.Numeric(),primary_key=True)
