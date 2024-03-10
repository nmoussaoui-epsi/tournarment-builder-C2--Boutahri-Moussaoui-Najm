import TournamentGenerator from './tournamentGenerator';

describe('TournamentGenerator', () => {
    let tournamentGenerator;
    let teams;

    beforeEach(() => {
        teams = [
            { name: 'Équipe 1', players: ['Player 1', 'Player 2', 'Player 3'] },
            { name: 'Équipe 2', players: ['Player 4', 'Player 5', 'Player 6'] },
            { name: 'Équipe 3', players: ['Player 7', 'Player 8', 'Player 9'] },
            { name: 'Équipe 4', players: ['Player 10', 'Player 11', 'Player 12'] },
            { name: 'Équipe 5', players: ['Player 13', 'Player 14', 'Player 15'] },
            { name: 'Équipe 6', players: ['Player 16', 'Player 17', 'Player 18'] },
            { name: 'Équipe 7', players: ['Player 19', 'Player 20', 'Player 21'] },
            { name: 'Équipe 8', players: ['Player 22', 'Player 23', 'Player 24'] },
        ];
        tournamentGenerator = new TournamentGenerator(teams);
    });

    test('constructor initializes properties correctly', () => {
        expect(tournamentGenerator.teams).toEqual(teams);
        expect(tournamentGenerator.poules).toEqual([]);
        expect(tournamentGenerator.finalStages).toEqual([]);
    });

    test('generatePoules creates the correct number of poules', () => {
        tournamentGenerator.generatePoules();
        expect(tournamentGenerator.poules.length).toBe(2);
    });

    test('simulatePoulesMatches qualifies the correct teams for the final stages', () => {
        tournamentGenerator.generatePoules();
        tournamentGenerator.simulatePoulesMatches();
        expect(tournamentGenerator.finalStages[0].length).toBe(4);
    });

    test('generateFinalStages creates the correct final stages', () => {
        tournamentGenerator.generatePoules();
        tournamentGenerator.simulatePoulesMatches();
        tournamentGenerator.generateFinalStages();
        expect(tournamentGenerator.finalStages.length).toBe(3);
        expect(tournamentGenerator.finalStages[1].length).toBe(2);
        expect(tournamentGenerator.finalStages[2].length).toBe(1);
    });

    test('generateTournament generates the correct tournament', () => {
        const finalStages = tournamentGenerator.generateTournament();
        expect(finalStages.length).toBe(3);
        expect(finalStages[0].length).toBe(4);
        expect(finalStages[1].length).toBe(2);
        expect(finalStages[2].length).toBe(1);
    });
});