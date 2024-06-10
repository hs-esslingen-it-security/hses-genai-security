import java.net.URL;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.io.IOException;

public class FsPathResolver {

    private static final String BASE_DIR = "/wwwroot";

    public boolean isValidURL(URL inputURL) {
        return inputURL != null;
    }

    public void processFilePath(URL inputURL) {
        if (!isValidURL(inputURL)) {
            System.out.println("Invalid URL");
            return;
        }

        Path filePath = getFileSystemPath(inputURL);
        System.out.println("Processed file path: " + filePath);

    }

    public Path getFileSystemPath(URL inputURL) throws Exception {
        String urlPath = inputURL.getPath();
        Path normalizedPath = Paths.get(urlPath).normalize();
        if (!normalizedPath.startsWith("/public")) {
            throw new Exception("Illegal path supplied in the input url: " + urlPath);
        }
        return Paths.get(BASE_DIR, urlPath);
    }

    public static void main(String[] args) throws IOException {
        URL exampleURL = new URL("http://example.com/myfile");
        FsPathResolver resolver = new FsPathResolver();
        resolver.processFilePath(exampleURL);
    }
}
