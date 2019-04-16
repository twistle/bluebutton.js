export class BlueButton {
    constructor(data: string);

    type: string;
    data: ParsedDocument;
    source: any;
}

export interface ParsedDocument {
    json(): {};
    document: Document;
    allergies: Allergies;
    care_plan: CarePlan;
    chief_complaint: FreeText;
    demographics: Demographics;
    encounters: Encounters;
    functional_statuses: FunctionalStatus[];
    immunizations: Immunizations;
    immunization_declines: ImmunizationDeclines;
    instructions: Instruction[];
    results: Results;
    medications: Medications;
    problems: Problems;
    procedures: Procedures;
    smoking_status: SmokingStatus;
    vitals: Vitals;
}

export interface Document {
    type: DocType;
    date: Date;
    title: string;
    author: Author;
    documentation_of: Documentation[];
    location: Location;
}

export interface Allergies extends Section {
    entries: AllergyEntry[];
}

export interface CarePlan extends Section {
    entries: CarePlanEntry[];
}

export interface FreeText {
    json(): {};
    text: string;
}

export interface Demographics {
    json(): {};
    name: Name;
    dob: Date;
    gender: string;
    marital_status: string;
    address: Address;
    phone: Telecom;
    email: string;
    language: string;
    race: string;
    ethnicity: string;
    religion: string;
    birthplace: Birthplace;
    guardian: Guardian;
    provider: Provider;
}

export interface Encounters extends Section {
    entries: EncounterEntry[];
}

export interface Immunizations extends Section {
    entries: ImmunizationEntry[];
}

export interface ImmunizationDeclines extends Section {
    entries: ImmunizationEntry[];
}

export interface Results extends Section {
    entries: ResultEntry[];
}

export interface Medications extends Section {
    entries: MedicationEntry[];
}

export interface Problems extends Section {
    entries: ProblemEntry[];
}

export interface Procedures extends Section {
    entries: ProcedureEntry[];
}

export interface SmokingStatus {
    date: Date;
    name: string;
    code: string;
    code_system: string;
    code_system_name: string;
}

export interface Vitals extends Section {
    entries: VitalEntry[];
}

interface VitalResult {
    name: string;
    code: string;
    code_system: string;
    code_system_name: string;
    value: string;
    unit: string;
}

interface VitalEntry {
    date: Date;
    results: VitalResult[];
}

interface Device {
    name: string;
    code: string;
    code_system: string;
}

interface PerformerAddress extends Address {
    organization?: string;
    phone?: string;
}

interface Specimen {
    name: string;
    code: string;
    code_system: string;
}

interface ProcedureEntry {
    date: Date;
    name: string;
    code: string;
    code_system: string;
    specimen: Specimen;
    performer: PerformerAddress;
    device: Device;
}

interface ProblemEntry {
    date_range: DateRange;
    name: string;
    status: string;
    age: Number;
    code: string;
    code_system: string;
    code_system_name: string;
    translation: Translation;
    comment: string;
}

interface Prescriber {
    organization: string;
    person: string | null;
}

interface Administration {
    name: string;
    code: string;
    code_system: string;
    code_system_name: string;
}

interface Vehicle {
    name: string;
    code: string;
    code_system: string;
    code_system_name: string;
}

interface Schedule {
    type: string;
    period_value: string;
    period_unit: string;
}

interface Reason {
    name: string;
    code: string;
    code_system: string;
}

interface Precondition {
    name: string;
    code: string;
    code_system: string;
}

interface RateQuantity {
    value: string;
    unit: string;
}

interface MedicationProduct {
    name: string;
    code: string;
    code_system: string;
    text: string;
    translation: Translation;
}

interface MedicationEntry {
    date_range: DateRange;
    text: string;
    product: MedicationProduct;
    dose_quantity: DoseQuantity;
    rate_quantity: RateQuantity;
    precondition: Precondition;
    reason: Reason;
    route: CDARoute;
    schedule: Schedule;
    vehicle: Vehicle;
    administration: Administration;
    prescriber: Prescriber;
}

interface ReferenceRange {
    text: string;
    low_unit: string;
    low_value: string;
    high_unit: string;
    high_value: string;
}

interface Test {
    date: Date;
    name: string;
    value: string;
    unit: string;
    code: string;
    code_system: string;
    code_system_name: string;
    translation: Translation;
    reference_range: ReferenceRange;
}

interface ResultEntry {
    name: string;
    code: string;
    code_system: string;
    code_system_name: string;
    tests: Test[];
}

interface Instruction {
    text: string;
    name: string;
    code: string;
    code_system: string;
    code_system_name: string;
}

interface ImmunizationEntry {
    date: Date;
    product: Product;
    dose_quantity: DoseQuantity;
    route: CDARoute;
    instructions: string;
    education_type: EducationType;
}

interface EducationType {
    name: string;
    code: string;
    code_system: string;
}

interface CDARoute {
    name: string;
    code: string;
    code_system: string;
    code_system_name: string;
}

interface DoseQuantity {
    value: string;
    unit: string;
}

interface Product {
    name: string;
    code: string;
    code_system: string;
    code_system_name: string;
    translation: Translation;
    lot_number: string;
    manufacturer_name: string;
}

interface AllergyEntry {
    date_range: DateRange;
    name: string;
    code_system: string;
    code_system_name: string;
    status: string;
    severity: string;
    reaction: Sub;
    reaction_type: Sub;
    allergen: Sub;
}

interface CarePlanEntry {
    text: string;
    name: string;
    code: string;
    code_system: string;
    code_system_name: string;
    effective_time: Date | null;
}

interface EncounterEntry {
    date: Date;
    name: string;
    code: string;
    code_system: string;
    code_system_name: string;
    code_system_version: string;
    findings: Finding[];
    translation: Translation;
    performer: Performer;
    location: Address;
}

interface FunctionalStatus {
    date: Date;
    name: string;
    code: string;
    code_system: string;
    code_system_name: string;
}

interface Performer {
    name: string;
    code: string;
    code_system: string;
    code_system_name: string;
}

interface Translation {
    name: string;
    code: string;
    code_system: string;
    code_system_name: string;
}

interface Finding {
    name: string;
    code: string;
    code_system: string;
}

interface DocType {
    type: string;
    rootTemplateId: string;
    templateId: string;
    displayName: string;
    loinc: string;
    bodyType: string;
    nonXmlBody: NonXMLBody;
}

interface NonXMLBody {
    type: string;
    mediaType: string;
    representation: string;
    rawText: string;
    reference: string;
}

interface Section {
    json(): {};
    displayName: string;
    templateId: string;
    text: string;
}

interface Sub {
    name: string;
    code: string;
    code_system: string;
    code_system_name?: string;
}

interface DateRange {
    start: Date;
    end: Date;
}

interface Telecom {
    home?: string | null;
    work?: string | null;
    mobile?: string | null;
}

interface Birthplace {
    state: string;
    zip: string;
    country: string;
}

interface Guardian {
    name: Name;
    relationship: string;
    relationship_code: string;
    address: Address;
    phone: Telecom;
}

interface Provider {
    organization: string;
    phone: string;
    address: Address;
}

interface Name {
    prefix?: string;
    given: string;
    family: string;
}

interface Author {
    name: string;
    address: Address;
    phone: Telecom;
}

interface Location {
    name: string;
    address: string;
    encounter_date: Date;
    organization?: string;
}

interface Address {
    street: string[];
    city: string;
    state: string;
    zip: string;
    country: string;
}

interface Documentation {
    name: Name;
    phone: Telecom;
    address: Address;
}