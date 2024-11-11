"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/formatters";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { addProduct } from "../../_actions/products";

export function ProductForm() {
  const [priceInDkk, setPriceInDkk] = useState<number>();

  return (
    <form action={addProduct} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input type="text" id="name" name="name" required />
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
      </div>
      <div className="text-muted-foreground">
        {formatCurrency(priceInDkk || 0 / 100)}
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="file">File</Label>
        <Input type="file" id="file" name="file" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="image">Image</Label>
        <Input type="file" id="image" name="image" required />
      </div>
      <Button type="submit">Save</Button>
    </form>
  );
}
