import assert from "assert";
import TournamentGenerator from "../src/tournamentGenerator.js";

describe("TournamentGenerator", () => {
  describe("Unit Tests", () => {
    it("should generate poules correctly", () => {
      const teams = [
        { name: "Team 1", players: ["Player 1", "Player 2", "Player 3", "Player 4"] },
        { name: "Team 2", players: ["Player 5", "Player 6", "Player 7", "Player 8"] },
        { name: "Team 3", players: ["Player 9", "Player 10", "Player 11", "Player 12"] },
        { name: "Team 4", players: ["Player 13", "Player 14", "Player 15", "Player 16"] },
      ];

      const tournamentGenerator = new TournamentGenerator(teams);
      tournamentGenerator.generatePoules();

      assert.strictEqual(tournamentGenerator.poules.length, 1);
      assert.strictEqual(tournamentGenerator.poules[0].length, 4);
    });

    it("should simulate poules matches correctly", () => {
      const teams = [
        { name: "Team 1", players: ["Player 1", "Player 2", "Player 3", "Player 4"] },
        { name: "Team 2", players: ["Player 5", "Player 6", "Player 7", "Player 8"] },
        { name: "Team 3", players: ["Player 9", "Player 10", "Player 11", "Player 12"] },
        { name: "Team 4", players: ["Player 13", "Player 14", "Player 15", "Player 16"] },
      ];

      const tournamentGenerator = new TournamentGenerator(teams);
      tournamentGenerator.generatePoules();
      tournamentGenerator.simulatePoulesMatches();

      assert.strictEqual(tournamentGenerator.finalStages.length, 1);
      assert.strictEqual(tournamentGenerator.finalStages[0].length, 2);
    });

    it("should generate final stages correctly", () => {
      const teams = [
        { name: "Team 1", players: ["Player 1", "Player 2", "Player 3", "Player 4"] },
        { name: "Team 2", players: ["Player 5", "Player 6", "Player 7", "Player 8"] },
        { name: "Team 3", players: ["Player 9", "Player 10", "Player 11", "Player 12"] },
        { name: "Team 4", players: ["Player 13", "Player 14", "Player 15", "Player 16"] },
      ];

      const tournamentGenerator = new TournamentGenerator(teams);
      tournamentGenerator.generatePoules();
      tournamentGenerator.simulatePoulesMatches();
      tournamentGenerator.generateFinalStages();

      assert.strictEqual(tournamentGenerator.finalStages.length, 2);
      assert.strictEqual(tournamentGenerator.finalStages[1].length, 1);
    });
  });

  describe("Functional Integration Test", () => {
    it("should generate tournament stages correctly", () => {
      const teams = [
        { name: "Team 1", players: ["Player 1", "Player 2", "Player 3", "Player 4"] },
        { name: "Team 2", players: ["Player 5", "Player 6", "Player 7", "Player 8"] },
        { name: "Team 3", players: ["Player 9", "Player 10", "Player 11", "Player 12"] },
        { name: "Team 4", players: ["Player 13", "Player 14", "Player 15", "Player 16"] },
      ];

      const tournamentGenerator = new TournamentGenerator(teams);
      const tournamentStages = tournamentGenerator.generateTournament();

      assert.strictEqual(tournamentStages.length, 2);
      assert.strictEqual(tournamentStages[0].length, 2);
      assert.strictEqual(tournamentStages[1].length, 1);
    });
  });
});
