import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class SeeReservationsService {
  apiUrl = 'http://localhost:5000'
  constructor(private http: HttpClient) { }

  getReservations(): Observable<Array<any>> {
    return this.http.get<any[]>(this.apiUrl)
  }
  updateReservationStatus(reservationId: number, newStatus: string) {
    const updateData = {
      id: reservationId,
      status: newStatus
    };
    const updateUrl = `${this.apiUrl}/reservationC/${reservationId}`;
    return this.http.put(updateUrl, updateData).subscribe((res) => {
      console.log('Status updated successfully:', res);

    },
      (error) => {

        console.error('Error updating Status:', error);
      });

  }
  updateReservationStatusR(reservationId: number, newStatus: string) {
    const updateData = {
      id: reservationId,
      status: newStatus
    };
    const updateUrl = `${this.apiUrl}/reservationR/${reservationId}`;
    return this.http.put(updateUrl, updateData).subscribe((res) => {
      console.log('Status updated successfully:', res);

    },
      (error) => {

        console.error('Error updating Status:', error);
      });

  }
  addNewReservation(reservation:string) {
    const updateURL = `${this.apiUrl}/new_reservation/${reservation}`;
    return this.http.post(updateURL,reservation).subscribe((res) => {
      console.log('Reservations updated successfully:', res);
    },
      (error) => {
        console.error('Error updating Reservations:', error);
      });

  }
}

