import { IFlashSaleDocument } from '../flashSale.model';


export const mockFlashSales = [
  {
    title: 'Morning Sale',
    startTime: new Date(Date.now() - 3600000),
    endTime: new Date(Date.now() + 3600000),
  },
  {
    title: 'Afternoon Sale',
    startTime: new Date(Date.now() + 3600000), // starts in 1 hour
    endTime: new Date(Date.now() + 7200000), // ends in 2 hours
  },
];



