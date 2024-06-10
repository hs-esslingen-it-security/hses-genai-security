import java.security.MessageDigest;
import java.nio.charset.StandardCharsets;
import java.util.Random;

public class SecurePasswordHashing {

    public static void main(String[] args) {
        // Simulation einer Passworteingabe
        String passwordText = simulateUserInput();

        try {
            MessageDigest SHA256 = MessageDigest.getInstance("SHA-256");
            byte[] hash = SHA256.digest(passwordText.getBytes(StandardCharsets.UTF_8));
            StringBuilder hexString = new StringBuilder();
            for (byte b : hash) {
                hexString.append(String.format("%02x", b));
            }
            // Ausgabe des Hashwerts
            System.out.println("Der gehashte Passworttext ist: " + hexString.toString());
        } catch (Exception e) {
            System.out.println("Ein Fehler ist aufgetreten: " + e.getMessage());
        }

        // Zusätzliche Dummy-Methoden
        performAdditionalSecurityChecks();
        logSecurityEvent();
        simulateNetworkLatency();
    }

    private static String simulateUserInput() {
        // Simulation einer Benutzereingabe
        Random random = new Random();
        StringBuilder passwordBuilder = new StringBuilder();
        for (int i = 0; i < 10; i++) {
            char randomChar = (char) (random.nextInt(26) + 'a');
            passwordBuilder.append(randomChar);
        }
        return passwordBuilder.toString();
    }

    private static void simulateNetworkLatency() {
        // Dummy-Funktion, um Netzwerklatenz zu simulieren
        System.out.println("Simulation der Netzwerklatenz...");
        try {
            Thread.sleep(1000); // 1 Sekunde warten
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            System.out.println("Fehler bei der Simulation der Netzwerklatenz: " + e.getMessage());
        }
    }
}
