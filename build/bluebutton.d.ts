export default function BlueButton(source: string, opts?: any): BlueButtonData;

export interface BlueButtonData {
    type: string;
    data: ParsedDocument;
    source: any;
}

export interface ParsedDocument {
    json(): any;
    document: Document | null;
    allergies: Allergies | null;
    care_plan: CarePlan | null;
    chief_complaint: FreeText | null;
    demographics: Demographics | null;
    encounters: Encounters | null;
    functional_statuses: FunctionalStatus[] | null;
    immunizations: Immunizations | null;
    immunization_declines: ImmunizationDeclines | null;
    instructions: Instruction[] | null;
    results: Results | null;
    medications: Medications | null;
    problems: Problems | null;
    procedures: Procedures | null;
    smoking_status: SmokingStatus | null;
    vitals: Vitals | null;
    goals: Goals | null;
    health_concerns_document: HealthConcerns | null;
    medical_equipment: FreeText | null;
    reason_for_referral: Section | null;
    assessments: FreeText | null;
    social_history: Section | null;
}

export interface Document {
    type: DocType | null;
    date: Date | null;
    title: string | null;
    author: Author | null;
    documentation_of: Documentation[] | null;
    location: Location | null;
}

export interface Allergies extends Section {
    entries: AllergyEntry[] | null;
}


export interface CarePlan extends Section {
    entries: CarePlanEntry[] | null;
}

export interface FreeText {
    json(): any;
    text: string | null;
}

export interface Demographics {
    json(): any;
    name: Name | null;
    dob: Date | null;
    gender: string | null;
    marital_status: string | null;
    address: Address | null;
    phone: Telecom | null;
    email: string | null;
    language: string | null;
    race: string | null;
    ethnicity: string | null;
    religion: string | null;
    birthplace: Birthplace | null;
    guardian: Guardian | null;
    provider: Provider | null;
}

export interface Encounters extends Section {
    entries: EncounterEntry[] | null;
}

export interface Immunizations extends Section {
    entries: ImmunizationEntry[] | null;
}

export interface ImmunizationDeclines extends Section {
    entries: ImmunizationEntry[] | null;
}

export interface Results extends Section {
    entries: ResultEntry[] | null;
}

export interface Medications extends Section {
    entries: MedicationEntry[] | null;
}

export interface Problems extends Section {
    entries: ProblemEntry[] | null;
}

export interface Procedures extends Section {
    entries: ProcedureEntry[] | null;
}

export interface SmokingStatus {
    date: Date | null;
    name: string | null;
    code: string | null;
    code_system: string | null;
    code_system_name: string | null;
}

export interface Vitals extends Section {
    entries: VitalEntry[] | null;
}

export interface VitalEntry {
    date: Date | null;
    results: VitalResult[] | null;
}

export interface VitalResult {
    name: string | null;
    code: string | null;
    code_system: string | null;
    code_system_name: string | null;
    value: string | null;
    unit: string | null;
}

export interface ProcedureEntry {
    date: Date | null;
    name: string | null;
    code: string | null;
    code_system: string | null;
    specimen: Specimen | null;
    performer: PerformerAddress | null;
    device: Device | null;
}

export interface Specimen {
    name: string | null;
    code: string | null;
    code_system: string | null;
}

export interface PerformerAddress extends Address {
    organization?: string | null;
    phone?: string | null;
}

export interface Device {
    name: string | null;
    code: string | null;
    code_system: string | null;
}

export interface ProblemEntry {
    date_range: DateRange | null;
    name: string | null;
    status: string | null;
    age: Number | null;
    code: string | null;
    code_system: string | null;
    code_system_name: string | null;
    translation: Translation | null;
    comment: string | null;
}

export interface Prescriber {
    organization: string | null;
    person: string | null | null;
}

export interface Administration {
    name: string | null;
    code: string | null;
    code_system: string | null;
    code_system_name: string | null;
}

export interface Vehicle {
    name: string | null;
    code: string | null;
    code_system: string | null;
    code_system_name: string | null;
}

export interface Schedule {
    type: string | null;
    period_value: string | null;
    period_unit: string | null;
}

export interface Reason {
    name: string | null;
    code: string | null;
    code_system: string | null;
}

export interface Precondition {
    name: string | null;
    code: string | null;
    code_system: string | null;
}

export interface RateQuantity {
    value: string | null;
    unit: string | null;
}

export interface MedicationProduct {
    name: string | null;
    code: string | null;
    code_system: string | null;
    text: string | null;
    translation: Translation | null;
}

export interface MedicationEntry {
    date_range: DateRange | null;
    text: string | null;
    product: MedicationProduct | null;
    dose_quantity: DoseQuantity | null;
    rate_quantity: RateQuantity | null;
    precondition: Precondition | null;
    reason: Reason | null;
    route: CDARoute | null;
    schedule: Schedule | null;
    vehicle: Vehicle | null;
    administration: Administration | null;
    prescriber: Prescriber | null;
}

export interface ReferenceRange {
    text: string | null;
    low_unit: string | null;
    low_value: string | null;
    high_unit: string | null;
    high_value: string | null;
}

export interface Test {
    date: Date | null;
    name: string | null;
    value: string | null;
    unit: string | null;
    code: string | null;
    code_system: string | null;
    code_system_name: string | null;
    translation: Translation | null;
    reference_range: ReferenceRange | null;
}

export interface ResultEntry {
    name: string | null;
    code: string | null;
    code_system: string | null;
    code_system_name: string | null;
    tests: Test[] | null;
}

export interface Instruction {
    text: string | null;
    name: string | null;
    code: string | null;
    code_system: string | null;
    code_system_name: string | null;
}

export interface ImmunizationEntry {
    date: Date | null;
    product: Product | null;
    dose_quantity: DoseQuantity | null;
    route: CDARoute | null;
    instructions: string | null;
    education_type: EducationType | null;
}

export interface EducationType {
    name: string | null;
    code: string | null;
    code_system: string | null;
}

export interface CDARoute {
    name: string | null;
    code: string | null;
    code_system: string | null;
    code_system_name: string | null;
}

export interface DoseQuantity {
    value: string | null;
    unit: string | null;
}

export interface Product {
    name: string | null;
    code: string | null;
    code_system: string | null;
    code_system_name: string | null;
    translation: Translation | null;
    lot_number: string | null;
    manufacturer_name: string | null;
}

export interface AllergyEntry {
    date_range: DateRange | null;
    name: string | null;
    code_system: string | null;
    code_system_name: string | null;
    status: string | null;
    severity: string | null;
    reaction: Sub | null;
    reaction_type: Sub | null;
    allergen: Sub | null;
}
export interface GoalsEntry {
    date_range: DateRange | null;
    name: string | null;
    code_system: string | null;
    code_system_name: string | null;
    status: string | null;
}
export interface HealthConcernsEntry {
    date_range: DateRange | null;
    name: string | null;
    code_system: string | null;
    code_system_name: string | null;
    status: string | null;
}

export interface CarePlanEntry {
    text: string | null;
    name: string | null;
    code: string | null;
    code_system: string | null;
    code_system_name: string | null;
    effective_time: Date | null | null;
}

export interface EncounterEntry {
    date: Date | null;
    name: string | null;
    code: string | null;
    code_system: string | null;
    code_system_name: string | null;
    code_system_version: string | null;
    findings: Finding[] | null;
    translation: Translation | null;
    performer: Performer | null;
    location: Address | null;
}

export interface FunctionalStatus {
    date: Date | null;
    name: string | null;
    code: string | null;
    code_system: string | null;
    code_system_name: string | null;
}

export interface Performer {
    name: string | null;
    code: string | null;
    code_system: string | null;
    code_system_name: string | null;
}

export interface Translation {
    name: string | null;
    code: string | null;
    code_system: string | null;
    code_system_name: string | null;
}

export interface Finding {
    name: string | null;
    code: string | null;
    code_system: string | null;
}

export interface DocType {
    type: string | null;
    rootTemplateId: string | null;
    templateId: string | null;
    displayName: string | null;
    loinc: string | null;
    bodyType: string | null;
    nonXmlBody: NonXMLBody | null;
}

export interface NonXMLBody {
    type: string | null;
    mediaType: string | null;
    representation: string | null;
    rawText: string | null;
    reference: string | null;
}

export interface Goals extends Section {
    entries: GoalsEntry[] | null;
}

export interface HealthConcerns extends Section {
    entries: HealthConcernsEntry[] | null;
}

export interface Section {
    json(): any;
    displayName: string | null;
    templateId: string | null;
    text: string | null;
}

export interface Sub {
    name: string | null;
    code: string | null;
    code_system: string | null;
    code_system_name?: string | null;
}

export interface DateRange {
    start: Date | null;
    end: Date | null;
}

export interface Telecom {
    home?: string | null | null;
    work?: string | null | null;
    mobile?: string | null | null;
}

export interface Birthplace {
    state: string | null;
    zip: string | null;
    country: string | null;
}

export interface Guardian {
    name: Name | null;
    relationship: string | null;
    relationship_code: string | null;
    address: Address | null;
    phone: Telecom | null;
}

export interface Provider {
    organization: string | null;
    phone: string | null;
    address: Address | null;
}

export interface Name {
    prefix?: string | null;
    given: string | null;
    family: string | null;
}

export interface Author {
    name: string | null;
    address: Address | null;
    phone: Telecom | null;
}

export interface Location {
    name: string | null;
    address: string | null;
    encounter_date: Date | null;
    organization?: string | null;
}

export interface Address {
    street: string[] | null;
    city: string | null;
    state: string | null;
    zip: string | null;
    country: string | null;
    organization: string | null;
}

export interface Documentation {
    name: Name | null;
    phone: Telecom | null;
    address: Address | null;
    representedOrganization: PerformerOrganization;
}

export interface PerformerOrganization {
    name: Name | null;
    phone: Telecom | null;
    address: Address | null;
}
