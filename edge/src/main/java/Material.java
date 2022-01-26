public class Material {
    String materialID;
    boolean defect;
    Material(String materialID, boolean defect){
        this.materialID = materialID;
        this.defect = defect;
    }

    Material(String message){
        String[] fields = message.split(";");
        this.materialID = fields[0];
        this.defect = Boolean.parseBoolean(fields[1]);
    }

    @Override
    public String toString() {
        return this.materialID+";"+this.defect;
    }
}
