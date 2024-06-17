import { HttpClient, HttpEvent, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Configuration } from '../../external-api/configuration';
import { ConfirmacionGanador } from '../../external-api/confirmacionGanador';
import { Email } from '../../external-api/email';
import { ResponseAsociaciones } from '../../external-api/responseAsociaciones';
import { ResponseSorteos } from '../../external-api/responseSorteos';
import { ResponseStatus } from '../../external-api/responseStatus';
import { ResponseToken } from '../../external-api/responseToken';
import { Sorteo } from '../../external-api/sorteo';
import { Usuario } from '../../external-api/usuario';

@Injectable({
  providedIn: 'root'
})
export class CensoService {

  protected basePath = 'https://censo-api.hogueras.es/emjf1/Censo-Hogueras/1.0.0';
  public defaultHeaders = new HttpHeaders();
  public configuration = new Configuration();

  constructor(
    private httpClient: HttpClient
  ) { 
    
  }

  /**
     * Actualizar el ganador
     * 
     * @param body 
     * @param participacion 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
  public ganadoresUpdate(body: ConfirmacionGanador, participacion: number, observe?: 'body', reportProgress?: boolean): Observable<ResponseStatus>;
  public ganadoresUpdate(body: ConfirmacionGanador, participacion: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ResponseStatus>>;
  public ganadoresUpdate(body: ConfirmacionGanador, participacion: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ResponseStatus>>;
  public ganadoresUpdate(body: ConfirmacionGanador, participacion: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

      if (body === null || body === undefined) {
          throw new Error('Required parameter body was null or undefined when calling ganadoresUpdate.');
      }

      if (participacion === null || participacion === undefined) {
          throw new Error('Required parameter participacion was null or undefined when calling ganadoresUpdate.');
      }

      let headers = this.defaultHeaders;

      // to determine the Accept header
      let httpHeaderAccepts: string[] = [
          'application/json'
      ];
      const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
      if (httpHeaderAcceptSelected != undefined) {
          headers = headers.set('Accept', httpHeaderAcceptSelected);
      }

      // to determine the Content-Type header
      const consumes: string[] = [
          'application/json'
      ];
      const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
      if (httpContentTypeSelected != undefined) {
          headers = headers.set('Content-Type', httpContentTypeSelected);
      }

      return this.httpClient.request<ResponseStatus>('put',`${this.basePath}/ganadores/${encodeURIComponent(String(participacion))}`,
          {
              body: body,
              withCredentials: this.configuration.withCredentials,
              headers: headers,
              observe: observe,
              reportProgress: reportProgress
          }
      );
  }

  /**
     * Obtención de ganadores del sorteo
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
  public ganadoresGet(observe?: 'body', reportProgress?: boolean): Observable<ResponseSorteos>;
  public ganadoresGet(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ResponseSorteos>>;
  public ganadoresGet(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ResponseSorteos>>;
  public ganadoresGet(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

      let headers = this.defaultHeaders;

      // authentication (BearerAuth) required
      if (this.configuration.accessToken) {
          const accessToken = typeof this.configuration.accessToken === 'function'
              ? this.configuration.accessToken()
              : this.configuration.accessToken;
          headers = headers.set('Authorization', 'Bearer ' + accessToken);
      }
      // to determine the Accept header
      let httpHeaderAccepts: string[] = [
          'application/json'
      ];
      const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
      if (httpHeaderAcceptSelected != undefined) {
          headers = headers.set('Accept', httpHeaderAcceptSelected);
      }

      // to determine the Content-Type header

      return this.httpClient.request<ResponseSorteos>('get',`${this.basePath}/ganadores`,
          {
              withCredentials: this.configuration.withCredentials,
              headers: headers,
              observe: observe,
              reportProgress: reportProgress
          }
      );
  }

  /**
     * Comprobar ganador mediante el DNI/NIF
     * 
     * @param dni 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
  public ganadorSearch(dni: string, observe?: 'body', reportProgress?: boolean): Observable<ResponseStatus>;
  public ganadorSearch(dni: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ResponseStatus>>;
  public ganadorSearch(dni: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ResponseStatus>>;
  public ganadorSearch(dni: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

      if (dni === null || dni === undefined) {
          throw new Error('Required parameter dni was null or undefined when calling ganadorSearch.');
      }

      let headers = this.defaultHeaders;

      // to determine the Accept header
      let httpHeaderAccepts: string[] = [
          'application/json'
      ];
      const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
      if (httpHeaderAcceptSelected != undefined) {
          headers = headers.set('Accept', httpHeaderAcceptSelected);
      }

      // to determine the Content-Type header

      return this.httpClient.request<ResponseStatus>('get',`${this.basePath}/ganadores/buscar/${encodeURIComponent(String(dni))}`,
          {
              withCredentials: this.configuration.withCredentials,
              headers: headers,
              observe: observe,
              reportProgress: reportProgress
          }
      );
  }

  /**
   * Listar todas las asociaciones
   * 
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public asociacionesGet(observe?: 'body', reportProgress?: boolean): Observable<ResponseAsociaciones>;
  public asociacionesGet(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ResponseAsociaciones>>;
  public asociacionesGet(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ResponseAsociaciones>>;
  public asociacionesGet(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

    let headers = this.defaultHeaders;

    // authentication (BearerAuth) required
    if (this.configuration.accessToken) {
        const accessToken = typeof this.configuration.accessToken === 'function'
            ? this.configuration.accessToken()
            : this.configuration.accessToken;
        headers = headers.set('Authorization', 'Bearer ' + accessToken);
    }
    // to determine the Accept header
    let httpHeaderAccepts: string[] = [
        'application/json'
    ];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
        headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header

    return this.httpClient.request<ResponseAsociaciones>('get',`${this.basePath}/asociaciones`,
        {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        }
    );
  }

  /**
   * Realizar la autentificación del usuario
   * 
   * @param body 
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public doLogin(body: Usuario, observe?: 'body', reportProgress?: boolean): Observable<ResponseToken>;
  public doLogin(body: Usuario, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ResponseToken>>;
  public doLogin(body: Usuario, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ResponseToken>>;
  public doLogin(body: Usuario, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

    let headers = this.defaultHeaders;

    let httpHeaderAccepts: string[] = ['application/json'];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
        headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [
        'application/json'
    ];
    const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected != undefined) {
        headers = headers.set('Content-Type', httpContentTypeSelected);
    }
    return this.httpClient.request<ResponseToken>('post',`${this.basePath}/login`,
      {
          body: body,
          withCredentials: this.configuration.withCredentials,
          headers: headers,
          observe: observe,
          reportProgress: reportProgress
      }
    );
  }

  /**
     * Guardar el formulario de sorteo
     * 
     * @param body 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
  public sorteosPost(body: Sorteo, observe?: 'body', reportProgress?: boolean): Observable<ResponseStatus>;
  public sorteosPost(body: Sorteo, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ResponseStatus>>;
  public sorteosPost(body: Sorteo, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ResponseStatus>>;
  public sorteosPost(body: Sorteo, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

      if (body === null || body === undefined) {
          throw new Error('Required parameter body was null or undefined when calling sorteosPost.');
      }

      let headers = this.defaultHeaders;

      // to determine the Accept header
      let httpHeaderAccepts: string[] = [
          'application/json'
      ];
      const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
      if (httpHeaderAcceptSelected != undefined) {
          headers = headers.set('Accept', httpHeaderAcceptSelected);
      }

      // to determine the Content-Type header
      const consumes: string[] = [
          'application/json'
      ];
      const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
      if (httpContentTypeSelected != undefined) {
          headers = headers.set('Content-Type', httpContentTypeSelected);
      }

      return this.httpClient.request<ResponseStatus>('post',`${this.basePath}/sorteos`,
          {
              body: body,
              withCredentials: this.configuration.withCredentials,
              headers: headers,
              observe: observe,
              reportProgress: reportProgress
          }
      );
  }

  /**
     * Guardar los ganadores que se pasen
     * 
     * @param body 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
  public ganadoresPost(body: Array<string>, observe?: 'body', reportProgress?: boolean): Observable<ResponseStatus>;
  public ganadoresPost(body: Array<string>, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ResponseStatus>>;
  public ganadoresPost(body: Array<string>, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ResponseStatus>>;
  public ganadoresPost(body: Array<string>, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

      if (body === null || body === undefined) {
          throw new Error('Required parameter body was null or undefined when calling ganadoresPost.');
      }

      let headers = this.defaultHeaders;

        // authentication (BearerAuth) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }

      // to determine the Accept header
      let httpHeaderAccepts: string[] = [
          'application/json'
      ];
      const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
      if (httpHeaderAcceptSelected != undefined) {
          headers = headers.set('Accept', httpHeaderAcceptSelected);
      }

      // to determine the Content-Type header
      const consumes: string[] = [
          'application/json'
      ];
      const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
      if (httpContentTypeSelected != undefined) {
          headers = headers.set('Content-Type', httpContentTypeSelected);
      }

      return this.httpClient.request<ResponseStatus>('post',`${this.basePath}/ganadores`,
          {
              body: body,
              withCredentials: this.configuration.withCredentials,
              headers: headers,
              observe: observe,
              reportProgress: reportProgress
          }
      );
  }

  /**
   * Enviar correo según la información que se pase
   * 
   * @param body 
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public sendEmailPost(body: Array<Email>, observe?: 'body', reportProgress?: boolean): Observable<ResponseStatus>;
  public sendEmailPost(body: Array<Email>, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ResponseStatus>>;
  public sendEmailPost(body: Array<Email>, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ResponseStatus>>;
  public sendEmailPost(body: Array<Email>, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

      if (body === null || body === undefined) {
          throw new Error('Required parameter body was null or undefined when calling sendEmailPost.');
      }

      let headers = this.defaultHeaders;

        // authentication (BearerAuth) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }

      // to determine the Accept header
      let httpHeaderAccepts: string[] = [
          'application/json'
      ];
      const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
      if (httpHeaderAcceptSelected != undefined) {
          headers = headers.set('Accept', httpHeaderAcceptSelected);
      }

      // to determine the Content-Type header
      const consumes: string[] = [
          'application/json'
      ];
      const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
      if (httpContentTypeSelected != undefined) {
          headers = headers.set('Content-Type', httpContentTypeSelected);
      }

      return this.httpClient.request<ResponseStatus>('post',`${this.basePath}/send-email`,
          {
              body: body,
              withCredentials: this.configuration.withCredentials,
              headers: headers,
              observe: observe,
              reportProgress: reportProgress
          }
      );
  }

  /**
   * Obtención de las tablas
   * 
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public sorteosGet(observe?: 'body', reportProgress?: boolean): Observable<ResponseSorteos>;
  public sorteosGet(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ResponseSorteos>>;
  public sorteosGet(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ResponseSorteos>>;
  public sorteosGet(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

      let headers = this.defaultHeaders;

        // authentication (BearerAuth) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }

      // to determine the Accept header
      let httpHeaderAccepts: string[] = [
          'application/json'
      ];
      const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
      if (httpHeaderAcceptSelected != undefined) {
          headers = headers.set('Accept', httpHeaderAcceptSelected);
      }

      // to determine the Content-Type header

      return this.httpClient.request<ResponseSorteos>('get',`${this.basePath}/sorteos`,
          {
              withCredentials: this.configuration.withCredentials,
              headers: headers,
              observe: observe,
              reportProgress: reportProgress
          }
      );
  }
    
}
