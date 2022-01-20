public class Material {
    int materialID;
    boolean defect;
    Material(int materialID, boolean defect){
        this.materialID = materialID;
        this.defect = defect;
    }

    Material(String message){
        String[] fields = message.split(";");
        this.materialID = Integer.parseInt(fields[0]);
        this.defect = Boolean.parseBoolean(fields[1]);
    }

    @Override
    public String toString() {
        return this.materialID+";"+this.defect;
    }
}
