import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BusinessAuthService } from '../../Shared/services/Business-auth.service';
import { BusinessTokenStorageService } from '../../Shared/services/Business-token-storage.service';
import { SafeResourceUrl,DomSanitizer} from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { IReportEmbedConfiguration, models } from 'powerbi-client';
import { interval, Observable } from 'rxjs';

export interface ConfigResponse {

  id:string;
  EmbedUrl: string;
  accessToken:string;
}


@Component({
  selector: 'app-track-board',
  templateUrl: './track-board.component.html',
  styleUrls: ['./track-board.component.css']
})

export class TrackBoardComponent implements OnInit {
  //canstants//
  reportConfig: IReportEmbedConfiguration = {
    type: 'report',
    filters: [],
    embedUrl: undefined,
    tokenType: models.TokenType.Aad,
    accessToken: undefined,
    settings:   { 
      navContentPaneEnabled: false,
      panes: {
      filters: {
          expanded: false,
          visible: false
      },
     
  
  }}};

  reportClass = 'visual';
  constructor(private http :HttpClient,private dom: DomSanitizer,private businessAuthService: BusinessAuthService, private businesstokenStorage: BusinessTokenStorageService) { }

  
  url1:any;
  url2:SafeResourceUrl
  u:any
  token:any
  currentBusiness:any

  
  ngOnInit(): void {
    this.currentBusiness = this.businesstokenStorage.getUser()
    
    //this.token="eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSIsImtpZCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvZGJkNjY2NGQtNGViOS00NmViLTk5ZDgtNWM0M2JhMTUzYzYxLyIsImlhdCI6MTY1NzE0ODkwNiwibmJmIjoxNjU3MTQ4OTA2LCJleHAiOjE2NTcxNTQ0OTAsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJFMlpnWUxncWJpaDJ3ekxyV3N6MnF6MDhEOVp1Q1B6KzBPS3UyZmQwOFFadTh6L3A2YXdBIiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6Ijk0N2Q1ZmExLTk1MjItNDUyMC1hMGU4LWMzOGU1NWFkZjUxYiIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiQ0hFQkJJIiwiZ2l2ZW5fbmFtZSI6IkFzbWEiLCJpcGFkZHIiOiI0MS4yMjUuMzkuMzAiLCJuYW1lIjoiQXNtYSBDSEVCQkkiLCJvaWQiOiIzYmZhYTFmMy1mYTZjLTQ5MjEtODNlYS02MjAwNWUyODNkNWUiLCJwdWlkIjoiMTAwMzIwMDA4MkI3MTRENCIsInJoIjoiMC5BUjhBVFdiVzI3bE82MGFaMkZ4RHVoVThZUWtBQUFBQUFBQUF3QUFBQUFBQUFBQWZBRmcuIiwic2NwIjoiQXBwLlJlYWQuQWxsIENhcGFjaXR5LlJlYWQuQWxsIENhcGFjaXR5LlJlYWRXcml0ZS5BbGwgQ29udGVudC5DcmVhdGUgRGFzaGJvYXJkLlJlYWQuQWxsIERhc2hib2FyZC5SZWFkV3JpdGUuQWxsIERhdGFmbG93LlJlYWQuQWxsIERhdGFmbG93LlJlYWRXcml0ZS5BbGwgRGF0YXNldC5SZWFkLkFsbCBEYXRhc2V0LlJlYWRXcml0ZS5BbGwgR2F0ZXdheS5SZWFkLkFsbCBHYXRld2F5LlJlYWRXcml0ZS5BbGwgUmVwb3J0LlJlYWQuQWxsIFJlcG9ydC5SZWFkV3JpdGUuQWxsIFN0b3JhZ2VBY2NvdW50LlJlYWQuQWxsIFN0b3JhZ2VBY2NvdW50LlJlYWRXcml0ZS5BbGwgV29ya3NwYWNlLlJlYWQuQWxsIFdvcmtzcGFjZS5SZWFkV3JpdGUuQWxsIiwic3ViIjoieTFnaUpzazBhU3FmdDdHWE5zYjIwN1M0cG5DSWVCdHFRaG9jTTQ3c21mVSIsInRpZCI6ImRiZDY2NjRkLTRlYjktNDZlYi05OWQ4LTVjNDNiYTE1M2M2MSIsInVuaXF1ZV9uYW1lIjoiYXNtYS5jaGViYmlAZXR1ZGlhbnQtaXNpLnV0bS50biIsInVwbiI6ImFzbWEuY2hlYmJpQGV0dWRpYW50LWlzaS51dG0udG4iLCJ1dGkiOiJFZ2xkVkpzckYwQ004R0RTemVNZkFBIiwidmVyIjoiMS4wIiwid2lkcyI6WyJiNzlmYmY0ZC0zZWY5LTQ2ODktODE0My03NmIxOTRlODU1MDkiXX0.VHL1GVmSccsbG5n7gTqHPKNpZ2mO-B3NRP_oAi0TA6qxNeZyHuS3onw3eq7DFTeveJ17HsnewbqOvxJGCSg877I4pOeNPQH4bFczEkIQnQeejxanqfE0jGlOkCrKsZ5YzilBrZSwl4mdXWSpTvP2Cd8BMl9POuKARRAwRhmTb_dYFqdU6gLjs0PtKOl8yHSAiLpGFDtLZpKpPI7LoKiQ7prEb26KTyHCLU4qdgkxqUEje_NK3ySVbLTaSl4mB8EXDa8tRy7Dvt0zYtu9Vo7HCOtz9tWSAPu_cB151D6ON-ErU1-7_T-nVW8egLsTFUqfGEvHjM1Blj7m36SljlR8oQ",
    //this.url1="https://app.powerbi.com/reportEmbed?reportId=87b61095-4d4b-46cb-96a8-c95765bf7a14&autoAuth=true&pageName=Page1&filterPaneEnabled=false&navContentPaneEnabled=false&$filter=business/idBusiness eq '"+this.currentBusiness.idBusiness +"'"
    //this.url2 =this.dom.bypassSecurityTrustResourceUrl(this.url1);
    //accessToken: "H4sIAAAAAAAEAB2Wta7FDJKE3-VPPZKZRprAzMzOzHjMvNp33zubtqqTKnV9_T__2Nk7zln5z7__sdTp-_xgAvX7hnSRIiaYOhrBZABzIsHiZ77PR5W3irmgiRl70Kz7OwsgSxBoViXAuZGoA6h13Md6kaDgowtGXWO0yEisYPUaNkO0IErgd7exA2n3O_AEwnWFX8Ga2W0QaX0z_NsQmFdtl7nHYlGphzIF5TEW_ZdSFgSnuxllj9oxFMjZ9oFbQ4Z6J9KevaH3Pci-0wmc4xXHnvrs2r0_b84LxBc6tr9lNppMTM09ObLxRfO5_RLWIiIHzNyRiSj1UYpBot14CBxZ4XmkMFWB4QUdGKjnfrlGftxkJyAqXk7ch9hwhscE28Ny05ncbl3MyEU2ZvLQx2dwVm6Bc5Xosioe2rm69P1yEtHghK6iDKoMRITbVfKWfGYHUdJ7KPXZfNHBz9RinT1GwcVGM9BpUgEJV8HiZ4lY-guUsO9WGXgSTZCjAgIGKFfBt9QG1G73sQMGa2L5pm_2F7q27QIr441yfVyRBv-zKAbZIGD8_dClf48L1AoPt8cNpCwAn7wE7cpT3Jfx8kh01ooMY7Tb_EKTu2yvoAtdFciV19ondZ5AIoCWN45lNXoME6qtgQBmAPOh3flujLYfBGLX1ElyPyT0YiULkfR7zPUYCpAxvfaOMgAD4DxKdxBR4vyCyR0OocSRin6psjtNjRCyre7knecM4TfdCRX-glJsRikifewxQhuNwzl6LNBocDYcdQwnQEH0nFBamt-5J2tLcy2tSNaoHLy9YFqadOe2bceW8e4JTdlLr36tEJgZDNG6gjT9bKBjsCCuXZLf450IReX3hSMWNq1ZgdVYYbwgfpzY3sJJuWsHwNZqApLaKyilVfCz4jfQOxPfo_s7CC3_XaofCgh2HpWSI08bG_UR3ySU5jFLxO8UT5dmmSbbQVK_ZocoCG9KxAuugN2mHsjVXYrpVp4iRbK2JQyoAW1iXBzpcZIPtjHS3DqCezyIEehHfZiMoLfFJlBoODaSo9KLifkVhUSYt_CPAxqYBbrB56PC6EoW365coyCgN1iHlo4nuXyLtkqBTbvFRNYWIkJQDiUCi-6UzY0274nx0W3RcO5J_4vYdk5OYRLhe69HU10Qtz1WZ58D20jsV0JAKMrqNtk1946LN6tMq4aKWMD1cHM1Opfb_jEetn2fG1Uti7swsja7buPE07Ac82mWxziz_dWSqLwGCf-88Gzscy_MxEQO2nDIj59xzVEDD0zlI-Wquxw1qOah8qd7cLQtAJAwqxx8rHJbjFpIMPJLYuU8wI1ztnh7lt201l6uhtH9_DFXIIOy7nV9fjOqcUb3QJbqEvpBYct0EUkGP12P_KpIFoEDLRKW-BNNZ3EqkaRvwrElU-9OibYcpaS7Iu5ExGaw0lzJNIzkF-zn6erfr5h9Hn8Uv0Q-irRnUEc3tEg3kPaX34NipodpveSnOWPxWr4MSNjYvXR3UC5Fd_LyC_SOS1swTTPsiw2-wsS0n1W8BzdpuiaFPY4YF9AwlAOQODEDuhOrGw5zlv2ViZV2DlElUcqH7BOCByUoLkmS0VEH7bqrdWzSEMd7eJSJkX1hJu-Yx3ZOAq1Lu51L3znLxFjItcUyouXsubUrTiMOUjvY5nVqzXy3DFIG8l8_JV-K1pZo03XYw__6Jf5gXZS29fsLNu258Yz3bNa-KpZb3gwlK-R6lWn-qiFf9_3eerfAIsuOUBFSgI_yw_l-mgVN3DNkuO7Pd5WDDn0Y28YA_9jxV7iQ-DPRAs7yzp8camsxhPsgbzkpv63AqBWgYAU1dtaIiu4qqNDgon9rSvqZ02Lt6rHeKFwvYMxnoacNRkl6ij25VQ0Z0lV4f8wravMBUo36kZQQ2uDJ75VjVNAbmCeWiErSxeRca5YE3SpbslfYhwOP8rFuB92O1zHTFaDdRNGUerI3nSqH8ocBb2ypnzkSA8myNEDik5Kx8HR3Y7TgtlfSQxO09z-olbk-Yn9wbZA9GirVurqc5yzos9uuCGZiwD3Nb-zlLLJl_0jloCsBmWMi4vLHhSI4TqaYBStjovGvytQ48Ixh8mMIj8kzS-k0BUVoncP1BJ5-TyTI_NY4lEaq2uKb-7oDtrmD9K0ogN_QzoTktewyM3oVE2nH5GCVkDBcjGaCS5voYnk1Tr1GCA573iqa5UGAgJnBINSsrktmNkWgkEd5zg2zU3Yar8XhArfxKMsSMnKIdkBTddfkmTZ99aCDmS85Hu4_g4P3WFrWJtdhcxvlSaoaSd4BfS6DRCmtHPqHWPOov9-MyXOpnPWr0NxQ5Zquf6jKbRwcMyfHDYls1mZmNNFrynRAyBOci96CDZScE3v_ymVowphLy86Kt_C2WNkPiaWyUUi5GnG28TNJOEav8HXs1zv5eZI9YcoHf0j2uHZoj23Y18di46gI6AQqPHC9TSARlrKftWc3oGtGgWP-PgvibSUTmjXvfhf54MA0ftlnUxAlYpuAyO_1eq4GRTnjZuZ8plxryzmaXtpAZfg9Iu6gkhHfR9j6QDhTJEBNAHnaVeD__OsfbnuXY9aq9--dS7FuJG2mZn-fAY5DLgtxdimlJtdBtopfzBfK7WFB8Labt-JFT3Eif_fJpKXrTgwo8K0Gts8S3GODexoL3peqcBJbaZtQGvD-d6pXd59bV-sVdwX8-C4YZpvF-bE2a_0RwZyPmLUiqGsPFui3vCsAo6ZZ4SaZuTo2e07e-eJaJAbV9vxQJA8nbEr66wp2J7rF8EfgS3J4_eu57RtGWK0eJiI-EO3mfKE5eTXohiqIDIZ8wl9BDk_sNMBt-WeeSbC4X0vURjZ39tarRh6qCKBl7jCf1jQgZjILrD0wOnuzaWrqX9OguO7TIE3As6RKNoKdL9lqE8mL-xc4u0K5UGSsayDzn__81-Z3aatNCf9cho2IIhIbZzC-QU-0u-9Mipv_V3ldM2XHuVV_spV3XcrUjEz2mMhx2ogJuKFAAwGV0PUqi4qdRAtl_uZynMqMRj4xVMcW9qE_2EhZuGWNYQm3UM7w7AxTJ6vY5UcqJLf2I4eBae3-uXxb76K89ZHqE7IJ2t8VB6xolTVViBh4qEEwRl7rEA34TGAIGjhyUVKr9yZhRVONKVkocmJt1SrsT-gjgFVzNwM7O4w70AHoZCsPbQHj_-T0W9LB_0yrj8KJD-yIIjfk5fS4-raY3OrQ0rgu8LmRlCkNEzw5y3njs2AabuVjSSDDoOUFHoQXy-bVsaZn-lsNO2vEyRcrDl47QaLm8XWiJ_a5RB4qwqEi1agy6qFVN1waqj-mG_x_w_jf_wNCtBbLwgwAAA==.eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVdFU1QtRVVST1BFLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZW1iZWRGZWF0dXJlcyI6eyJtb2Rlcm5FbWJlZCI6ZmFsc2V9fQ==",
    //embedUrl: "https://app.powerbi.com/reportEmbed?reportId=35f1833b-cd53-4bd6-a3c9-19991c22803f&autoAuth=true&pageName=Page1&filterPaneEnabled=false&navContentPaneEnabled=false&$filter=business/idBusiness eq '"+this.currentBusiness+"'",
    //id: '35f1833b-cd53-4bd6-a3c9-19991c22803f',
  
    const myFilter:models.IBasicFilter = {
      $schema: "http://powerbi.com/product/schema#basic",
      target: {
        table: "business",
        column: "idBusiness"
      },
      operator: "In",
      values: [this.currentBusiness.idBusiness],
      filterType: models.FilterType.Basic
    };
     


    //every 30minut wich is half an hour 
    interval(1800).subscribe(x => {
     
 
    this.PowerBiLogin().subscribe(res=>{
      
      this.token=res.AzureToken
   
    this.reportConfig = {
      type: 'report',
      tokenType: models.TokenType.Aad,
      filters: [myFilter],
      embedUrl: "https://app.powerbi.com/reportEmbed?reportId=d7019611-2b3b-45f2-816b-5d69de2898f9",
      accessToken: this.token ,
      settings:   { 
        
        navContentPaneEnabled: true,
        panes: {
        filters: {
            expanded: false,
            visible: false,  
            
        },
         
    },
    layoutType: models.LayoutType.Custom,
    customLayout: {
       displayOption: models.DisplayOption.FitToWidth,   
    }
  }};

  

})

});
 




} 

PowerBiLogin():Observable<any>{
  
  return this.http.get<any>('https://loginmicrosoft.herokuapp.com/token')
  
}



}


  

  

  
  

