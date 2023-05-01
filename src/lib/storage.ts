import { getStorage } from "firebase/storage";
import { firebaseApp } from "./firebase";

const storage = getStorage(firebaseApp);
export default storage;