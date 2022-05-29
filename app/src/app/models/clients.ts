
export interface clients{
    id : number,
    nom : string,
    prenom : string,
    montant_ht : number,
    delai_paiement : number,
    date_echeance : Date,
    action? : string,
    mode_reglement  :string,
    versement_client? : number,
    retard_paiement? : number,
    date_second_relance? : Date,
    penalite? : number,
    commentaire? : string,
    created_at : string,
    updated_at : string,
}