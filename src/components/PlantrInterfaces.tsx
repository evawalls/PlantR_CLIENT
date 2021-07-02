import * as React from 'react';

export interface AuthProps {
    updateToken: (newToken: string) => void;   
}

export interface AuthState {
    showLogin: boolean
}

export interface Garden {
    name: string;
    caretaker: string;
    imageURL: string;
    locationId: string;
    loading: boolean;
    secure_url: string;
}

export interface Plant {

}

export interface Log {

}

export interface location {

}