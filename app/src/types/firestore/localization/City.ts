import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { Country } from "./Country";
import { Province } from "./Province";

export interface City extends FirebaseFirestoreTypes.DocumentReference {
    name: string;
    coordinates: string;
    Province: Province;
    Country: Country;
}