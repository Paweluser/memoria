import {
  pgTable,
  serial,
  varchar,
  char,
  date,
  boolean,
  numeric,
  integer,
  time,
  text,
  check,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { relations } from "drizzle-orm";

// tables

export const clients = pgTable("Client", {
  id: serial("id").primaryKey(),
  firstName: varchar("firstName", { length: 50 }).notNull(),
  lastName: varchar("lastName", { length: 50 }).notNull(),
  phone: varchar("phone", { length: 15 }).notNull(),
  street: varchar("street", { length: 100 }),
  houseNumber: varchar("houseNumber", { length: 10 }),
  zipCode: varchar("zipCode", { length: 10 }),
  city: varchar("city", { length: 100 }),
  nip: varchar("nip", { length: 10 }),
  companyName: varchar("companyName", { length: 255 }),
});

export const deceased = pgTable("Deceased", {
  id: serial("id").primaryKey(),
  firstName: varchar("firstName", { length: 50 }).notNull(),
  lastName: varchar("lastName", { length: 50 }).notNull(),
  pesel: char("pesel", { length: 11 }).unique().notNull(),
  birthDate: date("birthDate").notNull(),
  deathDate: date("deathDate").notNull(),
  insured: boolean("insured").notNull(),
});

export const teams = pgTable("Team", {
  id: serial("id").primaryKey(),
  teamName: varchar("teamName", { length: 100 }).notNull(),
});

export const productCatalog = pgTable("ProductCatalog", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  category: varchar("category", { length: 50 }).notNull(),
  defaultPrice: numeric("defaultPrice", { precision: 10, scale: 2 }).notNull(),
  stockQuantity: integer("stockQuantity").default(0),
});

export const employees = pgTable("Employee", {
  id: serial("id").primaryKey(),
  teamId: integer("teamId").references(() => teams.id),
  firstName: varchar("firstName", { length: 50 }).notNull(),
  lastName: varchar("lastName", { length: 50 }).notNull(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  role: varchar("role", { length: 20 }).default("EMPLOYEE").notNull(),
});

export const ceremonies = pgTable(
  "Ceremony",
  {
    id: serial("id").primaryKey(),
    clientId: integer("clientId").references(() => clients.id),
    deceasedId: integer("deceasedId")
      .unique()
      .references(() => deceased.id),
    teamId: integer("teamId").references(() => teams.id),
    city: varchar("city", { length: 100 }).notNull(),
    funeralDate: date("funeralDate").notNull(),
    funeralTime: time("funeralTime"),
    bringingInTime: time("bringingInTime"),
    gatheringTime: time("gatheringTime"),
    burialType: varchar("burialType", { length: 20 }).notNull(),
    notes: text("notes"),
  },
  (table) => ({
    burialTypeCheck: check(
      "burialType_check",
      sql`${table.burialType} IN ('Trumna', 'Urna')`,
    ),
  }),
);

export const estimateItems = pgTable("EstimateItem", {
  id: serial("id").primaryKey(),
  ceremonyId: integer("ceremonyId").references(() => ceremonies.id),
  productId: integer("productId").references(() => productCatalog.id),
  purchasedPrice: numeric("purchasedPrice", {
    precision: 10,
    scale: 2,
  }).notNull(),
  quantity: integer("quantity").default(1).notNull(),
});

export const invoices = pgTable("Invoice", {
  id: serial("id").primaryKey(),
  ceremonyId: integer("ceremonyId")
    .unique()
    .references(() => ceremonies.id),
  invoiceNumber: varchar("invoiceNumber", { length: 50 }).unique().notNull(),
  issueDate: date("issueDate").notNull(),
  dueDate: date("dueDate").notNull(),
  paymentStatus: varchar("paymentStatus", { length: 30 })
    .default("PENDING")
    .notNull(),
  totalAmount: numeric("totalAmount", { precision: 10, scale: 2 }).notNull(),
  pdfFilePath: varchar("pdfFilePath", { length: 500 }),
});

export const transportOrders = pgTable("TransportOrder", {
  id: serial("id").primaryKey(),
  managerId: integer("managerId").references(() => employees.id),
  employeeId: integer("employeeId").references(() => employees.id),
  transportFrom: varchar("transportFrom", { length: 255 }).notNull(),
  transportTo: varchar("transportTo", { length: 255 }).notNull(),
  clientPhoneNumber: varchar("clientPhoneNumber", { length: 15 }).notNull(),
});

// relations

export const teamsRelations = relations(teams, ({ many }) => ({
  employees: many(employees),
  ceremonies: many(ceremonies),
}));

export const employeesRelations = relations(employees, ({ one, many }) => ({
  team: one(teams, {
    fields: [employees.teamId],
    references: [teams.id],
  }),
  managedTransports: many(transportOrders, { relationName: "manager" }),
  assignedTransports: many(transportOrders, { relationName: "employee" }),
}));

export const transportOrdersRelations = relations(
  transportOrders,
  ({ one }) => ({
    manager: one(employees, {
      fields: [transportOrders.managerId],
      references: [employees.id],
      relationName: "manager",
    }),
    employee: one(employees, {
      fields: [transportOrders.employeeId],
      references: [employees.id],
      relationName: "employee",
    }),
  }),
);

export const clientsRelations = relations(clients, ({ many }) => ({
  ceremonies: many(ceremonies),
}));

export const deceasedRelations = relations(deceased, ({ one }) => ({
  ceremony: one(ceremonies),
}));

export const ceremoniesRelations = relations(ceremonies, ({ one, many }) => ({
  client: one(clients, {
    fields: [ceremonies.clientId],
    references: [clients.id],
  }),
  deceased: one(deceased, {
    fields: [ceremonies.deceasedId],
    references: [deceased.id],
  }),
  team: one(teams, {
    fields: [ceremonies.teamId],
    references: [teams.id],
  }),
  estimateItems: many(estimateItems),
  invoice: one(invoices),
}));

export const productCatalogRelations = relations(
  productCatalog,
  ({ many }) => ({
    estimateItems: many(estimateItems),
  }),
);

export const estimateItemsRelations = relations(estimateItems, ({ one }) => ({
  ceremony: one(ceremonies, {
    fields: [estimateItems.ceremonyId],
    references: [ceremonies.id],
  }),
  product: one(productCatalog, {
    fields: [estimateItems.productId],
    references: [productCatalog.id],
  }),
}));

export const invoicesRelations = relations(invoices, ({ one }) => ({
  ceremony: one(ceremonies, {
    fields: [invoices.ceremonyId],
    references: [ceremonies.id],
  }),
}));
