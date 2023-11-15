import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CommonServicesService {

  constructor(private http: HttpClient) { }

  createUnit(createUnit: any): Observable<any> {
   
    return this.http.post(env.apiHost.concat('/registration/create-unit'), createUnit)

  }

  createLocalAdmin(createLocalUnit: any): Observable<any> {
   
    return this.http.post(env.apiHost.concat('/usermgt/ladmin-creation'), createLocalUnit)

  }

  updateLocalAdmin(createLocalUnit: any): Observable<any> {
   
    return this.http.post(env.apiHost.concat('/registration/updateLocalUnit'), createLocalUnit)

  }

  unitNameLocalAdmin(): Observable<any> {
   
    return this.http.post(env.apiHost.concat('/usermgt/get-unit-details'), {})

  }

  unitTypeLocalAdmin(): Observable<any> {
   
    return this.http.post(env.apiHost.concat('/usermgt/get-user-type'), {})

  }

  UnitDetails(): Observable<any> {
   
    return this.http.post(env.apiHost.concat('/usermgt/unit-details'), {})

  }

  policySummary(): Observable<any> {
   
    return this.http.post(env.apiHost.concat('/policy/policy-summary'), {})

  }

  // addPolicy(policyDeail: any): Observable<any> {
   
  //   return this.http.post(env.apiHost.concat('/policy/policy-add'), policyDeail)

  // }


  addPolicy(policyvalue: any, policytype: any): Observable<any> {
    const requestBody = {
      policyvalue: policyvalue,
      policytype: policytype,
    };

    return this.http.post(env.apiHost.concat('/policy/policy-add'), requestBody)


    // Assuming you are making a POST request to your API
    // return this.http.post<any>(`${this.apiUrl}/add-policy`, requestBody);
  }
// }


  Registeredclients(){
    return this.http.post<any>(env.apiHost.concat('/registration/client-reg-list'),{});

}
Registeredstatusclients(){
  return this.http.post<any>(env.apiHost.concat('/registration/client-status-list'),{});
  
}

policyBulkUpload(formData: any){
  return this.http.post<any>(env.apiHost.concat('/policy/policy-bulk'),formData);
  
}

urlAddition(search_term:any){
  return this.http.post<any>(env.apiHost.concat('/policy/url-addition'),search_term);
}

urlDeletion(search_term:any){
  return this.http.post<any>(env.apiHost.concat('/policy/url-deletion'),search_term);
}

ipAddition(search_term:any){
  return this.http.post<any>(env.apiHost.concat('/policy/ip-addition'),search_term);
}

ipDeletion(search_term:any){
  return this.http.post<any>(env.apiHost.concat('/policy/ip-deletion'),search_term);
}

serverPolicyVersion(){
  return this.http.post<any>(env.apiHost.concat('/policy/server-policy-version'),{});
}


}
