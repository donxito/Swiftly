"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/formatters";
import { useState } from "react";
import { addProduct } from "../../_actions/products";
import { useFormStatus, useFormState } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving..." : "Save"}
    </Button>
  );
}

export function ProductForm() {
  const [priceInDkk, setPriceInDkk] = useState<number>();

  const [error, action] = useFormState(addProduct, {});

  return (
    <form action={action} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input type="text" id="name" name="name" required />
        {error.name && <div className="text-destructive">{error.name}</div>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Price in DKK</Label>
        <Input
          type="number"
          id="priceInDkk"
          name="priceInDkk"
          required
          value={priceInDkk}
          onChange={(e) => setPriceInDkk(Number(e.target.value) || undefined)}
        />
        <div className="text-muted-foreground">
          {formatCurrency(priceInDkk || 0 / 100)}
        </div>
        {error.priceInDkk && (
          <div className="text-destructive">{error.priceInDkk}</div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" required />
        {error.description && (
          <div className="text-destructive">{error.description}</div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="file">File</Label>
        <Input type="file" id="file" name="file" required />
        {error.file && <div className="text-destructive">{error.file}</div>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Image</Label>
        <Input type="file" id="image" name="image" required />
        {error.image && <div className="text-destructive">{error.image}</div>}
      </div>

      <SubmitButton />
    </form>
  );
}
