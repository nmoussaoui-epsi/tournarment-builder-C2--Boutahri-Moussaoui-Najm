import TeamGenerator from './teamGenerator';

describe('TeamGenerator', () => {
    let teamGenerator;
    let players;

    beforeEach(() => {
        players = ['Player 1', 'Player 2', 'Player 3', 'Player 4', 'Player 5', 'Player 6'];
        teamGenerator = new TeamGenerator(players);
    });

    test('constructor initializes properties correctly', () => {
        expect(teamGenerator.players).toEqual(players);
        expect(teamGenerator.playersPerTeam).toBe(3);
        expect(teamGenerator.teams).toEqual([]);
    });

    test('generateTeams creates the correct number of teams', () => {
        teamGenerator.generateTeams();
        expect(teamGenerator.teams.length).toBe(2);
    });

    test('getTeams returns the correct teams', () => {
        teamGenerator.generateTeams();
        const teams = teamGenerator.getTeams();
        expect(teams).toEqual(teamGenerator.teams);
    });
});

describe('TeamGenerator.getTeam', () => {
    let teamGenerator;
    let players;

    beforeEach(() => {
        players = ['Player 1', 'Player 2', 'Player 3', 'Player 4', 'Player 5', 'Player 6'];
        teamGenerator = new TeamGenerator(players);
        teamGenerator.generateTeams();
    });

    test('returns the correct team', () => {
        const team = teamGenerator.getTeam('Équipe 1');
        expect(team.name).toBe('Équipe 1');
        expect(team.players.length).toBe(3);
    });

    test('throws an error for invalid team name', () => {
        expect(() => teamGenerator.getTeam('Invalid Team Name')).toThrow(Error);
    });

    test('throws an error if teams have not been generated', () => {
        const newTeamGenerator = new TeamGenerator(players);
        expect(() => newTeamGenerator.getTeam('Équipe 1')).toThrow(Error);
    });
});