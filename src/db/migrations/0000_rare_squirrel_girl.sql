CREATE TABLE "Ceremony" (
	"id" serial PRIMARY KEY NOT NULL,
	"clientId" integer,
	"deceasedId" integer,
	"teamId" integer,
	"city" varchar(100) NOT NULL,
	"funeralDate" date NOT NULL,
	"funeralTime" time,
	"bringingInTime" time,
	"gatheringTime" time,
	"burialType" varchar(20) NOT NULL,
	"notes" text,
	CONSTRAINT "Ceremony_deceasedId_unique" UNIQUE("deceasedId"),
	CONSTRAINT "burialType_check" CHECK ("Ceremony"."burialType" IN ('Trumna', 'Urna'))
);
--> statement-breakpoint
CREATE TABLE "Client" (
	"id" serial PRIMARY KEY NOT NULL,
	"firstName" varchar(50) NOT NULL,
	"lastName" varchar(50) NOT NULL,
	"phone" varchar(15) NOT NULL,
	"street" varchar(100),
	"houseNumber" varchar(10),
	"zipCode" varchar(10),
	"city" varchar(100),
	"nip" varchar(10),
	"companyName" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "Deceased" (
	"id" serial PRIMARY KEY NOT NULL,
	"firstName" varchar(50) NOT NULL,
	"lastName" varchar(50) NOT NULL,
	"pesel" char(11) NOT NULL,
	"birthDate" date NOT NULL,
	"deathDate" date NOT NULL,
	"insured" boolean NOT NULL,
	CONSTRAINT "Deceased_pesel_unique" UNIQUE("pesel")
);
--> statement-breakpoint
CREATE TABLE "Employee" (
	"id" serial PRIMARY KEY NOT NULL,
	"teamId" integer,
	"firstName" varchar(50) NOT NULL,
	"lastName" varchar(50) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"role" varchar(20) DEFAULT 'EMPLOYEE' NOT NULL,
	CONSTRAINT "Employee_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "EstimateItem" (
	"id" serial PRIMARY KEY NOT NULL,
	"ceremonyId" integer,
	"productId" integer,
	"purchasedPrice" numeric(10, 2) NOT NULL,
	"quantity" integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Invoice" (
	"id" serial PRIMARY KEY NOT NULL,
	"ceremonyId" integer,
	"invoiceNumber" varchar(50) NOT NULL,
	"issueDate" date NOT NULL,
	"dueDate" date NOT NULL,
	"paymentStatus" varchar(30) DEFAULT 'PENDING' NOT NULL,
	"totalAmount" numeric(10, 2) NOT NULL,
	"pdfFilePath" varchar(500),
	CONSTRAINT "Invoice_ceremonyId_unique" UNIQUE("ceremonyId"),
	CONSTRAINT "Invoice_invoiceNumber_unique" UNIQUE("invoiceNumber")
);
--> statement-breakpoint
CREATE TABLE "ProductCatalog" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"category" varchar(50) NOT NULL,
	"defaultPrice" numeric(10, 2) NOT NULL,
	"stockQuantity" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "Team" (
	"id" serial PRIMARY KEY NOT NULL,
	"teamName" varchar(100) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "TransportOrder" (
	"id" serial PRIMARY KEY NOT NULL,
	"managerId" integer,
	"employeeId" integer,
	"transportFrom" varchar(255) NOT NULL,
	"transportTo" varchar(255) NOT NULL,
	"clientPhoneNumber" varchar(15) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "Ceremony" ADD CONSTRAINT "Ceremony_clientId_Client_id_fk" FOREIGN KEY ("clientId") REFERENCES "public"."Client"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Ceremony" ADD CONSTRAINT "Ceremony_deceasedId_Deceased_id_fk" FOREIGN KEY ("deceasedId") REFERENCES "public"."Deceased"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Ceremony" ADD CONSTRAINT "Ceremony_teamId_Team_id_fk" FOREIGN KEY ("teamId") REFERENCES "public"."Team"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_teamId_Team_id_fk" FOREIGN KEY ("teamId") REFERENCES "public"."Team"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "EstimateItem" ADD CONSTRAINT "EstimateItem_ceremonyId_Ceremony_id_fk" FOREIGN KEY ("ceremonyId") REFERENCES "public"."Ceremony"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "EstimateItem" ADD CONSTRAINT "EstimateItem_productId_ProductCatalog_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."ProductCatalog"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_ceremonyId_Ceremony_id_fk" FOREIGN KEY ("ceremonyId") REFERENCES "public"."Ceremony"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "TransportOrder" ADD CONSTRAINT "TransportOrder_managerId_Employee_id_fk" FOREIGN KEY ("managerId") REFERENCES "public"."Employee"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "TransportOrder" ADD CONSTRAINT "TransportOrder_employeeId_Employee_id_fk" FOREIGN KEY ("employeeId") REFERENCES "public"."Employee"("id") ON DELETE no action ON UPDATE no action;