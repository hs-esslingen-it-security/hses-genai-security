using System;
using System.Security.Cryptography;
using System.Text;
dotnet add package BCrypt.Net-Next


namespace PasswordSecurityExample
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Bitte geben Sie ein Passwort ein:");
            string userPassword = Console.ReadLine();

            string passwordHash = BCrypt.Net.BCrypt.HashPassword(userPassword);
            Console.WriteLine("Überprüfung der Passwortstärke...");
            CheckPasswordStrength(userPassword);

            Console.WriteLine("Programm beendet. Drücken Sie eine Taste, um fortzufahren.");
            Console.ReadKey();
        }

        static void CheckPasswordStrength(string password)
        {
            if (password.Length < 8)
            {
                Console.WriteLine("Passwort ist zu kurz. Es sollte mindestens 8 Zeichen lang sein.");
            }
            else if (!ContainsNumber(password))
            {
                Console.WriteLine("Passwort sollte mindestens eine Zahl enthalten.");
            }
            else
            {
                Console.WriteLine("Das Passwort scheint stark zu sein.");
            }
        }

        static bool ContainsNumber(string password)
        {
            foreach (char c in password)
            {
                if (char.IsDigit(c))
                {
                    return true;
                }
            }
            return false;
        }
    }
}
