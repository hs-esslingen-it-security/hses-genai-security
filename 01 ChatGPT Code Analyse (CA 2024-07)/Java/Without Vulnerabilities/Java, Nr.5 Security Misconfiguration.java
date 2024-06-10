protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    String xmlInput = request.getReader().readLine();

    DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();

    factory.setFeature(XMLConstants.FEATURE_SECURE_PROCESSING, true);
    factory.setAttribute(XMLConstants.ACCESS_EXTERNAL_DTD, "");
    factory.setAttribute(XMLConstants.ACCESS_EXTERNAL_STYLESHEET, "");

    DocumentBuilder builder = factory.newDocumentBuilder();
    Document document = builder.parse(new InputSource(new StringReader(xmlInput)));
    NodeList items = document.getElementsByTagName("item");

    if (items.getLength() == 0) {
        return;
    }

    Element item = (Element) items.item(0);
    String favourite = item.getTextContent();
    addToFavorites(favourite);
    response.getWriter().printf("Favourite %s saved", favourite);
}