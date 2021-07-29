
export interface AuthProps {
    updateToken: (newToken: string) => void;   
}

export interface AuthState {
    showLogin: boolean
}

export interface GardenList {
    id: string;
    name: string;
    caretaker: string;
    imageURL: string;
    locationId: string;
    // loading: string;
    secure_url: string;
}

export interface GardenCardProps {
    sessionToken: string;
    open: boolean;
    id: string;
    name: string;
    caretaker: string;
    imageURL: string;
    fetchGardens: Function;
    gardens: GardenObject[];

  }
  export interface GardenObject {
    id: string;
    name: string;
    caretaker: string;
    imageURL: string;
  }

  export interface GardenCardState {
    gardens: GardenObject[];
    open: boolean;
    id: string;
    name: string;
    caretaker: string;
    imageURL: string;
  }

export interface Plant {

}

export interface Log {

}

export interface location {

}