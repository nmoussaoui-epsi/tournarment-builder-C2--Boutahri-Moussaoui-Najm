// Tests pour le code existant
import CSVReader from './csvReader';

describe('CSVReader', () => {
    let csvReader;

    beforeEach(() => {
        csvReader = new CSVReader('path/to/csv');
    });

    test('constructor initializes properties correctly', () => {
        expect(csvReader.filePath).toBe('path/to/csv');
        expect(csvReader.data).toEqual([]);
    });

    test('readCSV returns a promise', () => {
        const result = csvReader.readCSV();
        expect(result).toBeInstanceOf(Promise);
    });

    // Ce test nécessite un vrai fichier CSV pour passer
    test('readCSV promise resolves with expected data', async () => {
        const data = await csvReader.readCSV();
        expect(data).toEqual(expectedData); // Remplacez expectedData par les données attendues
    });
});

// Tests pour la nouvelle fonctionnalité
describe('CSVReader.getRow', () => {
    let csvReader;

    beforeEach(async () => {
        csvReader = new CSVReader('path/to/csv');
        await csvReader.readCSV(); // Assurez-vous que le CSV est lu avant chaque test
    });

    test('returns the correct row', () => {
        const row = csvReader.getRow(1);
        expect(row).toEqual(expectedRow); // Remplacez expectedRow par la ligne attendue
    });

    test('throws an error for invalid index', () => {
        expect(() => csvReader.getRow(-1)).toThrow(Error);
        expect(() => csvReader.getRow(csvReader.data.length)).toThrow(Error);
    });

    test('throws an error if CSV has not been read', () => {
        const newCsvReader = new CSVReader('path/to/csv');
        expect(() => newCsvReader.getRow(0)).toThrow(Error);
    });
});