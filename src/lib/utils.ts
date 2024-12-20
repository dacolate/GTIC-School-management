import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

 /**
* Checks if a date is after the midpoint between two other dates.
* @param startDate - The starting date.
* @param endDate - The ending date.
* @param dateToCheck - The date to compare against the midpoint.
* @returns True if the dateToCheck is after the midpoint, false otherwise.
*/
export function isAfterMidpoint(startDate: Date, endDate: Date, dateToCheck: Date): boolean {
 // Ensure all inputs are valid Date objects
 if (!(startDate instanceof Date) || !(endDate instanceof Date) || !(dateToCheck instanceof Date)) {
   throw new Error("All inputs must be valid Date objects.");
 }

 // Ensure startDate is before or equal to endDate
 if (startDate > endDate) {
   throw new Error("startDate must be before or equal to endDate.");
 }

 // Calculate the midpoint
 const midpointTime = (startDate.getTime() + endDate.getTime()) / 2;
 const midpointDate = new Date(midpointTime);

 // Return true if dateToCheck is after the midpoint
 return dateToCheck > midpointDate;
}

// Example usage
const startDate = new Date("2024-12-01");
const endDate = new Date("2024-12-31");
const dateToCheck = new Date("2024-12-20");

console.log(isAfterMidpoint(startDate, endDate, dateToCheck)); // Output: true or false
