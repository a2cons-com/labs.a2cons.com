// Screenshots in public/shots/. All of them come from demo data (A2
// Contracts: the dev "Harbor Point Builders" company; A2 QBO and BI
// Inventory: throwaway demo databases), never from a real company.
const shot = (src: string, w: number, h: number, alt: string) => ({ src: `/shots/${src}`, w, h, alt });

export const shots = {
  qboHero: shot('qbo-dashboard.webp', 2560, 1600, 'A2 QBO dashboard: year-to-date income, gross profit, net income and cash against two earlier years, above monthly income and net income charts'),
  qboChart: shot('qbo-cash.webp', 2560, 1600, 'A2 QBO: month-end bank balance across three years, and where the money went by account compared with last year'),
  qboDesk: shot('qbo-profit-check.webp', 2560, 1600, "A2 QBO's profit check: net income against the change in cash, month by month, with who booked each amount"),
  contractsDesk: shot('overview.webp', 2560, 1600, "A2 Contracts: a project's overview with progress, upcoming inspections, the latest daily report and site photos"),
  contractsPhone: shot('contracts-phone-photos.webp', 780, 1688, 'A2 Contracts on a phone: site photos grouped by day, with captions and favorites'),
  contractsPhone2: shot('contracts-phone-report.webp', 780, 1688, "A2 Contracts on a phone: a daily report with the day's jobsite photos"),
  inventoryPhone: shot('inventory-phone-locations.webp', 1206, 2622, 'BI Inventory on iPhone: top-level locations with their sub-locations and item counts'),
  inventoryPhone2: shot('inventory-phone-freezer.webp', 1206, 2622, 'BI Inventory on iPhone: a freezer’s contents with quantities and days until each item expires'),
};
