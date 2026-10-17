/**
 * Phase 01: Organization Domain Unit & Invariant Tests
 * Tests:
 * 1. Default profile and main branch initialization
 * 2. Duplicate branch code rejection
 * 3. Main campus invariants (cannot have two mains, cannot demote main directly)
 * 4. Academic year creation, date order validation, and active session switching
 * 5. Input validation rules
 */

import { InMemoryOrganizationRepository } from "../organization.repository.js";
import { OrganizationService } from "../organization.service.js";

async function runTests() {
  console.log("=== Running Phase 01 Organization Domain Tests ===");
  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string) {
    if (condition) {
      console.log(`[PASS] ${testName}`);
      passed++;
    } else {
      console.error(`[FAIL] ${testName}`);
      failed++;
    }
  }

  const repo = new InMemoryOrganizationRepository();
  const service = new OrganizationService(repo);

  // 1. Initial State
  const profile = await service.getProfile();
  assert(profile.shortName === "USP", "Initial profile loads default universal shortName");

  const branches = await service.getBranches();
  assert(branches.length === 1 && branches[0].isMain, "Exactly one main campus exists initially");

  // 2. Main Campus Conflict
  try {
    await service.createBranch({
      code: "MAIN2",
      name: "Second Main Campus",
      address: "Street 1",
      city: "Islamabad",
      phone: "+92 51 0000000",
      email: "main2@school.org",
      isMain: true, // Should fail!
    });
    assert(false, "Prevented creating a second main campus");
  } catch (err: unknown) {
    const e = err as { code: string };
    assert(e.code === "MAIN_BRANCH_CONFLICT", "Main branch conflict correctly thrown");
  }

  // 3. Create Valid Secondary Branch
  const cityBranch = await service.createBranch({
    code: "CITY",
    name: "City Branch",
    address: "Block B, Downtown",
    city: "Rawalpindi",
    phone: "+92 51 9998887",
    email: "city@school.org",
    isMain: false,
    capacity: 600,
  });
  assert(cityBranch.code === "CITY" && !cityBranch.isMain, "Successfully created secondary branch");

  // 4. Duplicate Code Conflict
  try {
    await service.createBranch({
      code: "city", // case insensitive collision
      name: "Duplicate City Branch",
      address: "Another address",
      city: "Rawalpindi",
      phone: "+92 51 9998887",
      email: "city2@school.org",
    });
    assert(false, "Prevented duplicate branch code");
  } catch (err: unknown) {
    const e = err as { code: string };
    assert(e.code === "BRANCH_CODE_CONFLICT", "Duplicate code throws BRANCH_CODE_CONFLICT");
  }

  // 5. Invariant: Cannot deactivate the Main Campus
  const mainBranch = branches[0];
  try {
    await service.updateBranch(mainBranch.id, { isActive: false });
    assert(false, "Prevented deactivating main campus");
  } catch (err: unknown) {
    const e = err as { code: string };
    assert(e.code === "INVARIANT_VIOLATION", "Main campus deactivation throws INVARIANT_VIOLATION");
  }

  // 6. Academic Year Validations
  try {
    await service.createAcademicYear({
      name: "2027-2028",
      startDate: "2028-08-01",
      endDate: "2027-05-31", // End date before start date!
    });
    assert(false, "Prevented invalid chronological academic dates");
  } catch (err: unknown) {
    const e = err as { code: string };
    assert(e.code === "VALIDATION_FAILED", "Chronological order error throws VALIDATION_FAILED");
  }

  // 6.1 Term Regression: Term starts before parent academic year
  try {
    await service.createAcademicYear({
      name: "2029-2030",
      startDate: "2029-08-01",
      endDate: "2030-05-31",
      terms: [
        {
          name: "Early Term",
          termCode: "T-EARLY",
          startDate: "2029-07-15", // Before 2029-08-01!
          endDate: "2029-12-20",
        },
      ],
    });
    assert(false, "Prevented term starting before parent academic year");
  } catch (err: unknown) {
    const e = err as { code: string };
    assert(e.code === "VALIDATION_FAILED", "Term starting before academic year throws VALIDATION_FAILED");
  }

  // 6.2 Term Regression: Term ends after parent academic year
  try {
    await service.createAcademicYear({
      name: "2029-2030",
      startDate: "2029-08-01",
      endDate: "2030-05-31",
      terms: [
        {
          name: "Late Term",
          termCode: "T-LATE",
          startDate: "2030-01-05",
          endDate: "2030-06-15", // After 2030-05-31!
        },
      ],
    });
    assert(false, "Prevented term ending after parent academic year");
  } catch (err: unknown) {
    const e = err as { code: string };
    assert(e.code === "VALIDATION_FAILED", "Term ending after academic year throws VALIDATION_FAILED");
  }

  // 6.3 Term Regression: Term start date after term end date
  try {
    await service.createAcademicYear({
      name: "2029-2030",
      startDate: "2029-08-01",
      endDate: "2030-05-31",
      terms: [
        {
          name: "Reversed Term",
          termCode: "T-REV",
          startDate: "2029-12-20",
          endDate: "2029-09-01", // Reversed!
        },
      ],
    });
    assert(false, "Prevented term start date after term end date");
  } catch (err: unknown) {
    const e = err as { code: string };
    assert(e.code === "VALIDATION_FAILED", "Term start date after end date throws VALIDATION_FAILED");
  }

  // 6.4 Term Regression: Term matching academic year boundaries exactly is accepted
  const exactBoundaryYear = await service.createAcademicYear({
    name: "2029-2030",
    startDate: "2029-08-01",
    endDate: "2030-05-31",
    terms: [
      {
        name: "Full Year Term",
        termCode: "T-FULL",
        startDate: "2029-08-01",
        endDate: "2030-05-31",
      },
    ],
  });
  assert(exactBoundaryYear.terms.length === 1, "Term matching exact academic year boundaries accepted");

  // 6.5 Term Regression: Multiple terms lying completely inside academic year accepted
  const multiTermYear = await service.createAcademicYear({
    name: "2031-2032",
    startDate: "2031-08-01",
    endDate: "2032-05-31",
    terms: [
      {
        name: "Term 1",
        termCode: "T-1",
        startDate: "2031-08-01",
        endDate: "2031-12-20",
      },
      {
        name: "Term 2",
        termCode: "T-2",
        startDate: "2032-01-05",
        endDate: "2032-05-31",
      },
    ],
  });
  assert(multiTermYear.terms.length === 2, "Multiple valid terms inside academic year accepted");

  // 6.6 Term Regression: Term with missing/invalid required dates rejected
  try {
    await service.createAcademicYear({
      name: "2033-2034",
      startDate: "2033-08-01",
      endDate: "2034-05-31",
      terms: [
        {
          name: "Invalid Date Term",
          termCode: "T-INV",
          startDate: "invalid-date",
          endDate: "2034-01-01",
        },
      ],
    });
    assert(false, "Prevented term with invalid date format");
  } catch (err: unknown) {
    const e = err as { code: string };
    assert(e.code === "VALIDATION_FAILED", "Term with invalid date format throws VALIDATION_FAILED");
  }

  // 7. Academic Year Activation Transition
  const nextSession = await service.createAcademicYear({
    name: "2027-2028",
    startDate: "2027-08-01",
    endDate: "2028-05-31",
    isCurrent: false,
  });
  assert(!nextSession.isCurrent, "New academic year created inactive by default");

  const activated = await service.setActiveAcademicYear(nextSession.id);
  assert(activated.isCurrent, "Academic year transition marks new year as current");

  const previousSession = await repo.getAcademicYearById("ay-2026-2027");
  assert(previousSession?.isCurrent === false, "Previous academic year successfully unmarked as current");

  console.log(`\nTests Summary: ${passed} Passed, ${failed} Failed.`);
  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((e) => {
  console.error("Test execution failed:", e);
  process.exit(1);
});
