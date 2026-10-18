// Screenshots in public/shots/. All of them come from demo data (A2
// Contracts: the dev "Harbor Point Builders" company; A2 QBO: "Coastal Bean
// Roasters"; BI Inventory: "Fernwood Workshop & Home"), never a real company.
// tools/build-images.sh makes the smaller -1280 (desktop) / -400 (phone)
// copies used in srcset.
const shot = (name: string, w: number, h: number, alt: string) => {
  const small = w >= 2000 ? 1280 : 400;
  return {
    src: `/shots/${name}.webp`,
    srcset: `/shots/${name}-${small}.webp ${small}w, /shots/${name}.webp ${w}w`,
    w,
    h,
    alt,
  };
};
export type Shot = ReturnType<typeof shot>;

export const shots = {
  qboHero: shot('qbo-dashboard', 2560, 1600, 'A2 QBO dashboard: year-to-date income, gross profit, net income and cash against two earlier years, above monthly income and net income charts'),
  qboChart: shot('qbo-cash', 2560, 1600, 'A2 QBO: month-end bank balance across three years, and where the money went by account compared with last year'),
  qboDesk: shot('qbo-profit-check', 2560, 1600, "A2 QBO's profit check: net income against the change in cash, month by month, with who booked each amount"),
  qboPayroll: shot('qbo-payroll', 2560, 1810, 'A2 QBO payroll run: paychecks for eight employees with gross pay, withholdings, net pay and employer taxes, ready to post to QuickBooks'),
  contractsDesk: shot('overview', 2560, 1600, "A2 Contracts: a project's overview with progress, upcoming inspections, the latest daily report and site photos"),
  contractsPhone: shot('contracts-phone-photos', 780, 1688, 'A2 Contracts on a phone: site photos grouped by day, with captions and favorites'),
  contractsPhone2: shot('contracts-phone-report', 780, 1688, "A2 Contracts on a phone: a daily report with the day's jobsite photos"),
  contractsPlans: shot('contracts-phone-plans', 780, 1688, 'A2 Contracts on a phone: an electrical plan sheet with red markups and a revision cloud'),
  inventoryPhone: shot('inventory-phone-locations', 1206, 2622, 'BI Inventory on iPhone: top-level locations with their sub-locations and item counts'),
  inventoryPhone2: shot('inventory-phone-freezer', 1206, 2622, 'BI Inventory on iPhone: a freezer’s contents with quantities and days until each item expires'),
  inventoryDesk: shot('inventory-desk-locations', 2560, 1600, 'BI Inventory web app: nested locations with a freezer’s items and their expiry countdowns'),
};
