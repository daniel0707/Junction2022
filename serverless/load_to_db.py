from db_models import Recyclepoint, Material, RecyclepointMaterial
import dotenv
import os
import psycopg2
import json
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from geoalchemy2 import Geography

dotenv.load_dotenv("./.env")
CONNECT_STR=os.environ["CONNECT_STR"]

def getconn():
    return psycopg2.connect('postgres://avnadmin:AVNS_HqUNPfFvM5oY698S1SN@postgres-db-service-junction-2022.aivencloud.com:17227/defaultdb?sslmode=require')
def main():
    engine = create_engine('postgresql+psycopg2://',creator=getconn)
    sn = sessionmaker(engine)
    with open('data.json','r') as f:
        with sn.begin() as session:
            session: Session
            material_map={}
            data = json.loads(f.read())
            for node_wrapper in data["edges"]:
                node: dict=node_wrapper["node"]
                #try:
                try:
                    cord=f"POINT({node['geometry']['coordinates'][0]} {node['geometry']['coordinates'][1]})"
                except:
                    cord=None
                tmp = Recyclepoint(
                    address=node['address'],
                    coordinates=cord,
                    spot_name=node["name"],
                    municipality=node["municipality"],
                    postal_code=node.get("postal_code",None),
                    id=node["spot_id"]
                )
                if(tmp.postal_code==""):
                    tmp.postal_code=None
                
                session.add(tmp)

                for material in node["materials"]:
                    session.add(RecyclepointMaterial(
                        fk_recyclepoint=node["spot_id"],
                        fk_material=material["code"]
                    ))
                    material_map[material["code"]]=material["name"]
            for mat_code, mat_name in material_map.items():
                session.add(Material(
                    id=mat_code,
                    name_fi=mat_name
                ))
        session.commit()
        session.close()

if __name__ == "__main__":
    main()