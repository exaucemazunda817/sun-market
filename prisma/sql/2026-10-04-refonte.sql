-- Refonte du site (paquet design_handoff_sun_market), 04/10/2026.
-- AJOUTS UNIQUEMENT : rien n'est supprimé ni renommé. Ne jamais utiliser
-- `prisma db push` sur ce projet : la base contient aussi les tables du travail
-- abandonné du 26/09 (User, Investissement, RendezVous), que Prisma
-- proposerait de supprimer. À exécuter instruction par instruction.

ALTER TABLE "Dossier" ADD COLUMN IF NOT EXISTS "reference" TEXT;
CREATE UNIQUE INDEX IF NOT EXISTS "Dossier_reference_key" ON "Dossier"("reference");
ALTER TABLE "Dossier" ADD COLUMN IF NOT EXISTS "rccm" TEXT;
ALTER TABLE "Dossier" ADD COLUMN IF NOT EXISTS "anciennete" TEXT;
ALTER TABLE "Dossier" ADD COLUMN IF NOT EXISTS "usageFonds" TEXT;
ALTER TABLE "Dossier" ADD COLUMN IF NOT EXISTS "dureeMois" INTEGER;
ALTER TABLE "Dossier" ADD COLUMN IF NOT EXISTS "moyenPaiement" TEXT;
ALTER TABLE "Dossier" ALTER COLUMN "contactEmail" DROP NOT NULL;

CREATE TABLE IF NOT EXISTS "ContactMessage" (
  "id" TEXT NOT NULL,
  "sujet" TEXT NOT NULL,
  "nom" TEXT NOT NULL,
  "telephone" TEXT NOT NULL,
  "message" TEXT NOT NULL,
  "traite" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "ContactMessage_pkey" PRIMARY KEY ("id")
);
