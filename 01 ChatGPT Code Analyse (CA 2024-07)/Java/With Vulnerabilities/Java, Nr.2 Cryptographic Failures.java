import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Scanner;

public class PasswordHashingApp {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("Bitte geben Sie Ihr Passwort ein:");
        String password = scanner.nextLine();

        try {
            String hashedPassword = hashPassword(password);
            System.out.println("Das gehashte Passwort lautet: " + hashedPassword);
        } catch (NoSuchAlgorithmException e) {
            System.out.println("Fehler beim Hashen des Passworts: " + e.getMessage());
        }
    }

    private static String hashPassword(String password) throws NoSuchAlgorithmException {
        MessageDigest md5 = MessageDigest.getInstance("MD5");
        byte[] hash = md5.digest(password.getBytes());
        StringBuilder hexString = new StringBuilder();
        for (byte b : hash) {
            hexString.append(String.format("%02x", b));
        }
        return hexString.toString();
    }
}
