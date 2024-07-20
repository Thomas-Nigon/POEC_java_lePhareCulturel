import { inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

export enum HttpMethodEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

export class CustomHttpApiService {
  // Add more HTTP methods as required
  /**
   * Helper function to prepare the options for a request
   * @param method - HTTP method
   * @param data - Optional data to be sent with request
   * @returns a RequestInit object with the method, headers and body
   */
  public makeOptions(method: HttpMethodEnum, data?: never) {
    return {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
  }

  protected http = inject(HttpClient);
  public httpErrorResponse: HttpErrorResponse | null = null;

  public handleError(err: HttpErrorResponse | null) {
    this.handleErrorDetails(err, null);
  }

  /**
   * Handles Http error from Http request
   * @param error - HTTP error response
   * @param frontEndCallback
   * @returns Observable that emits no items and does not terminate
   */
  protected handleErrorDetails(
    error: HttpErrorResponse | null,
    frontEndCallback: ((error: unknown, errorMessage: string) => Observable<unknown>) | null,
  ): Observable<unknown> | null {
    // Observable<never> | null
    if (error === null) {
      console.log('Unreacheable Error from this handler : NULL ERROR ');
      return null;
    }
    let errorMessage = 'An unknown error occurred!';

    // Handle ErrorEvent
    if (error.error instanceof ErrorEvent) {
      errorMessage = `A client-side error occurred: ${error.error.message}`;
    }

    // Handle HttpErrorResponse
    if (error.error instanceof HttpErrorResponse) {
      errorMessage = `Backend returned code ${error.status.toString()},`;
      const error_message: string = error.message;
      errorMessage = `${errorMessage}\n body was: ${error_message}`;
    }

    this.httpErrorResponse = error;
    // Handle general error status codes
    switch (error.status) {
      case 404:
        errorMessage = 'Error 404: Resource not found';
        break;
      case 500:
        errorMessage = 'Error 500: Server error';
        break;
      case 403:
        errorMessage = 'Error 403: Forbidden';
        break;
      // more cases...
      default:
        break;
    }

    // Log the error message
    console.error(errorMessage);

    if (frontEndCallback) {
      return frontEndCallback(error, errorMessage);
    }
    // Emit the error message
    return null;
    // throwError(() => new Error(errorMessage));
  }

  /**
   * Sends a http request
   * @param url - URL of the http request
   * @param options - Options for the HTTP request
   * @returns a Promise of any type
   */
  public async request(url: string, options: RequestInit): Promise<unknown> {
    return fetch(url, options)
      .then((response: Response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.statusText);
        }
      })
      .catch((error: unknown) => {
        console.error(error);
        throw error;
      });
  }

  public requestWith(
    url: string,
    data?: never,
    onSuccess?: (response: unknown) => Promise<unknown>,
    onSuccessFrontEndCallback?: (response: unknown) => Promise<unknown>,
    onError?: (error: unknown) => Promise<unknown>,
    onErrorFrontEndCallback?: (error: unknown) => Observable<unknown>,
    httpMethod: HttpMethodEnum | null
  ): Promise<unknown[]> {
    return Promise.all([
      this.request(url, this.makeOptions(httpMethod ?? HttpMethodEnum.GET, data))
        .then(response => {
          if (onSuccess) {
            if (onSuccessFrontEndCallback) {
              void onSuccessFrontEndCallback(response);
            }
            return onSuccess(response);
          } else {
            return new Observable<unknown>();
          }
        })
        .catch((error: unknown) => {
          if (onError) {
            if (onErrorFrontEndCallback) {
              void onErrorFrontEndCallback(error);
            }
            return onError(error);
          } else {
            console.log(error);
            return this.handleErrorDetails(error, onErrorFrontEndCallback);
          }
        }),
    ]);
  }
}
