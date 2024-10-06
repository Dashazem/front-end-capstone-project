import { library } from "@fortawesome/fontawesome-svg-core";

import { 
  faUser,
  faUserTie,
  faBagShopping,
  faBars,
  faHouse,
  faClipboard,
  faSquarePlus,
  faTrash, 
  faSignOutAlt, 
  faEdit, 
  faSpinner, 
  faPlusCircle,
  faPhone,
  faEnvelope,
  faMapMarkedAlt,
  faLock
} from "@fortawesome/free-solid-svg-icons";

const Icons = () => {
  return library.add(faUser, faUserTie, faBagShopping, faBars, faHouse, faClipboard, faSquarePlus, faTrash, faSignOutAlt, faEdit, faSpinner, faPlusCircle, faPhone, faEnvelope, faMapMarkedAlt, faLock);
}

export default Icons;