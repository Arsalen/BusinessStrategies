export class Search {
    id: number;
    client_id: number;
    expression: string;
    plateform_1: string;// = [ 'Facebook', 'Twitter', 'Foodly' ] 
    plateform_2: string;
    plateform_3: string;
    FbUrl: string;
    period: string[] = ['long','medium','short'];
    analysis_1: string;// = ['location','gender', 'age' ,'review']
    analysis_2: string;
    analysis_3: string;
    analysis_4: string;
}

