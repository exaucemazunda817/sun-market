import { expect, type Locator, type Page } from "@playwright/test";

// Un formulaire de dépôt de dossier, repéré par son titre (plusieurs
// formulaires coexistent sur une même page).
export class DossierFormSection {
  readonly form: Locator;

  constructor(readonly page: Page, title: string) {
    this.form = page.locator("form").filter({ has: page.getByRole("heading", { name: title }) });
  }

  field(label: string) {
    return this.form.getByLabel(label);
  }

  async fillContact() {
    await this.field("Nom complet").fill("Test automatique");
    await this.field("E-mail").fill("test@example.com");
    await this.field("Téléphone").fill("+243000000000");
  }

  async submit() {
    await this.form.getByRole("button", { name: "Envoyer ma demande" }).click();
  }

  async expectSuccess() {
    await expect(this.page.getByRole("status").filter({ hasText: "Demande envoyée avec succès" })).toBeVisible();
  }
}

export async function mockDossiersApi(page: Page, status = 201) {
  const calls: unknown[] = [];
  await page.route("**/api/dossiers", async (route) => {
    calls.push(route.request().postDataJSON());
    await route.fulfill({ status, contentType: "application/json", body: JSON.stringify(status < 300 ? { id: "test" } : { error: "x" }) });
  });
  return calls;
}
