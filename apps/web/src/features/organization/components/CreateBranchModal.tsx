"use client";

import React, { useState, useTransition } from "react";
import { CreateBranchDto, Branch } from "@universal-school/shared-types";
import { organizationApi } from "@/features/organization/api";
import { Button, Input, Modal } from "@/components/ui";

interface CreateBranchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBranchCreated: (branch: Branch) => void;
}

export const CreateBranchModal: React.FC<CreateBranchModalProps> = ({
  isOpen,
  onClose,
  onBranchCreated,
}) => {
  const [formCode, setFormCode] = useState<string>("");
  const [formName, setFormName] = useState<string>("");
  const [formCity, setFormCity] = useState<string>("");
  const [formAddress, setFormAddress] = useState<string>("");
  const [formPhone, setFormPhone] = useState<string>("");
  const [formEmail, setFormEmail] = useState<string>("");
  const [formCapacity, setFormCapacity] = useState<string>("500");
  const [formError, setFormError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const resetForm = () => {
    setFormCode("");
    setFormName("");
    setFormCity("");
    setFormAddress("");
    setFormPhone("");
    setFormEmail("");
    setFormCapacity("500");
    setFormError(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const payload: CreateBranchDto = {
      code: formCode.trim().toUpperCase(),
      name: formName.trim(),
      city: formCity.trim(),
      address: formAddress.trim(),
      phone: formPhone.trim(),
      email: formEmail.trim(),
      capacity: Number(formCapacity) || undefined,
      isMain: false,
      shifts: [
        {
          name: "Morning Shift",
          type: "MORNING",
          startTime: "08:00",
          endTime: "14:00",
        },
      ],
    };

    startTransition(async () => {
      try {
        const created = await organizationApi.createBranch(payload);
        onBranchCreated(created);
        handleClose();
      } catch (err: unknown) {
        const e = err as Error;
        setFormError(e.message || "Failed to create branch.");
      }
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Create New Campus / Branch"
      description="Expand institution multi-campus topology"
    >
      {formError && (
        <div className="p-3 mb-4 rounded-[var(--radius-lg)] bg-[var(--color-error-subtle)] border border-[var(--color-error-border)] text-xs text-[var(--color-error)]">
          {formError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Branch Code *"
            type="text"
            required
            placeholder="e.g. CITY, NORTH"
            value={formCode}
            onChange={(e) => setFormCode(e.target.value)}
            className="font-mono uppercase"
          />
          <Input
            label="Campus Name *"
            type="text"
            required
            placeholder="e.g. City Campus"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="City *"
            type="text"
            required
            placeholder="e.g. Rawalpindi"
            value={formCity}
            onChange={(e) => setFormCity(e.target.value)}
          />
          <Input
            label="Capacity"
            type="number"
            placeholder="e.g. 500"
            value={formCapacity}
            onChange={(e) => setFormCapacity(e.target.value)}
          />
        </div>

        <Input
          label="Physical Address *"
          type="text"
          required
          placeholder="Street / Sector details"
          value={formAddress}
          onChange={(e) => setFormAddress(e.target.value)}
        />

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Phone *"
            type="text"
            required
            placeholder="+92 51 ..."
            value={formPhone}
            onChange={(e) => setFormPhone(e.target.value)}
          />
          <Input
            label="Email *"
            type="email"
            required
            placeholder="branch@school.edu"
            value={formEmail}
            onChange={(e) => setFormEmail(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-[var(--border-subtle)]">
          <Button
            type="button"
            variant="ghost"
            size="md"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="md"
            isLoading={isPending}
          >
            Save Branch
          </Button>
        </div>
      </form>
    </Modal>
  );
};
