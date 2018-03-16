
import {
    Platform,
    Dimensions,
    processColor
  } from 'react-native';
  
  const ScreenWidth = Dimensions.get('window').width;
  const ScreenHeight = Dimensions.get('window').height;
  
    // WTF - needs to edit the Mafra font name
    if(Platform.OS === 'android') {
      var fontHeadline = "MafraCondensedDeckMedium";
      var adArchives = '8';
  
    } else {
      // ios
      var fontHeadline = "Mafra Condensed Deck";
      var adArchives = '7';
    }
  
    const htmlContentUpload = `<h3>Teilnahme</h3><p>Der Nutzer des Direktmelders gewährt der Heinrich Rüttgerodt GmbH & Co. KG, nachfolgend Verlag genannt, mit Übermittlung von Texten und Fotos ein zeitlich und ortsunabhängiges, allerdings nicht exklusives Nutzungsrecht an den Inhalten. Der Verlag und damit sämtliche Tochtergesellschaften i. S. d. §§15 AktG werden zum Zeitpunkt der Übermittlung durch den Nutzer dazu ermächtigt, die übermittelten Inhalte für eigene Zwecke zu nutzen, zu vervielfältigen, zu verbreiten, drahtgebunden oder drahtlos zum Abruf bereitzustellen, zu archivieren und in Datenbanken zu speichern. Weiterhin ist der Verlag berechtigt, die Inhalte zu publizieren und zu bearbeiten, wenn dies zur grafischen Darstellung, aus redaktionellen Gründen und/oder zur Verbindung mit weiteren Werken notwendig ist.</p><p>Für den Nutzer entsteht mit Übermittlung seiner Inhalte kein Recht auf Veröffentlichung. Die Publikation der Inhalte liegt im Ermessen des Verlags und ist abhängig von der Relevanz und Qualität der Beiträge und Fotos. Wir weisen ausdrücklich darauf hin, dass für den Nutzer mit Einräumung der oben genannten Nutzungsrechte kein Anspruch auf die Zahlung eines Honorars besteht. Darüber hinaus werden Copyright-Vermerke nicht gestattet. Der Nutzer besitzt kein Recht auf Schadensersatzansprüche gegenüber dem Verlag.</p><h3>Ausgeschlossene Inhalte</h3><p>Ausgeschlossen von der Veröffentlichung sind Inhalte, die gegen deutsches Recht verstoßen und insbesondere:</p><p>a) Inhalte, die in die Rechte Dritter eingreifen, sofern der Nutzer nicht über eine formelle Lizenz oder Erlaubnis des Rechteinhabers verfügt, welche die Publikation ausdrücklich erlauben</p><p>b) Beiträge mit pornografischen, sittenwidrigen oder in sonstiger Weise anstößigen Inhalten</p><p>c) Beiträge, die von verfassungsfeindlichen, extremistischen oder sonstigen verbotenen Gruppierungen stammen</p><p>d) Beiträge, die strafbar, volksverhetzend oder in sonstiger Weise verboten sind</p><p>e) Beiträge, die unsachlich und unwahr sind</p><p>f) Beiträge, die dazu dienen, gewerbliche Produkte und Dienstleistungen zu bewerben.</p><h3>Gerichtsstand</h3><p>Der Gerichtsstand ist Einbeck.</p><h3>Datenschutz</h3><p>Für die Teilnahme am Direktmelder ist es erforderlich, eine E-Mail-Adresse und/oder Telefonnummer anzugeben. Die von Ihnen eingegebenen persönlichen Daten werden gemäß unserer Datenschutzerklärung sehr sensibel behandelt. Wir gewährleisten Ihnen den höchstmöglichen Schutz dieser Daten.</p>`;
    const htmlContentImpress=`<h3>Heinrich Rüttgerodt GmbH &amp; Co. KG</h3><p>Marktplatz 12 / 14<br />37574 Einbeck<br /><br /><strong>Vertreten durch:</strong><br />Kristiane Rüttgerodt <br />Hinrich Rüttgerodt<br /><br /><strong>Kontakt:</strong><br>Telefon: (0 55 61) 40 02<br>Telefax: (0 55 61) 7 33 83<br>&nbsp;<br>E-Mail: <a href="mailto: app@einbecker-morgenpost.de">app@einbecker-morgenpost.de</a><br><br><strong>Registergericht:</strong><br>Amtsgericht Göttingen<br><br><strong>Registernummer: </strong><br>HRA 130737<br><strong><br>Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:</strong><br>DE 114 768 159<br><strong><br>Verantwortlich für den Inhalt nach §55 ABs. 2 RStV:</strong><br>Mark Sturm<br>- Heinrich Rüttgerodt GmbH &amp; Co KG -<br>Hansestraße 13<br />37574 Einbeck</p>`;
    const htmlContentPrivacyPolicy=`<p>Wir möchten Sie darüber informieren, dass wir für diese mobile Applikation die gesetzlichen Bestimmungen gemäß Presserecht, Bundesdatenschutzgesetz (BDSG), Telemediengesetz (TMG) und weiteren Datenschutzgesetzen beachten, da sowohl der Schutz der Privatsphäre als auch der Schutz unserer Kunden für uns von besonderer Bedeutung sind.</p><h3>Personenbezogene Daten</h3><p>Ihre personenbezogenen Daten werden nur erhoben und gespeichert, wenn Sie uns Ihre Zustimmung über einen Opt-In bei der Erstinstallation oder bei einem Update der App erteilt haben.</p><p>Personenbezogene Daten werden nicht unbefugt an Dritte weitergegeben. Eine Übermittlung von Daten in staatliche Einrichtungen und Behörden erfolgt nur im Rahmen zwingender Rechtsvorschriften. Als Nutzer haben Sie das Recht, sich entgeltlich und unverzüglich über die zu Ihrer Person erhobenen Daten und den logischen Aufbau der Datensammlung zu erkundigen (§§14, 14 TMG, §§6, 6a, 34 BDSG).</p><p>Die erforderlichen Daten werden im Bedarfsfall unter strikter Wahrung der Bestimmungen des BDSG, des TMG und weiterer datenschutzrechtlicher Gesetze von uns gespeichert und verarbeitet.</p><h3>Widerspruch</h3><p>Wenn Sie mit der Speicherung und Auswertung dieser Daten nicht einverstanden sind, können Sie der Speicherung und Nutzung per Einstellung (Opt-Out) in der App jederzeit widersprechen.</p>`;
  
    const ObjLocationCategories  = [
      { archive: '1', subMenuLabel: 'Economic fair'},
      { archive: '2', subMenuLabel: 'Motor'},
      { archive: '3', subMenuLabel: 'Stores'},
    ];
  
    const APP_CONSTANTS =   {
  
    objLocationCategories : ObjLocationCategories,
    LocationsFallback: "1",
  
    screenX: ScreenWidth,
    screenY: ScreenHeight,
  
    apiUrl: "https://api.mopo-server.de",
    apiKey: "04a0a1ca18a1beaa24dfcecfe224d53f",
  
    // Settings for the new Newsfeed
    // How many newsitems should be grabbed per call.
    apiNewsLimit: "5",
    apiNewsArchive: "einbeckmesse",
  
    // Ad / Banner
    apiAdArchives: adArchives,
  
    apiRefreshTime: 15*60000,
  
    serverurl: "https://mopo-server.de",
  
    // Youtube API KEY
    YoutubeAPIKey: "AIzaSyDnHRcAVdm_hLVvZNTIBCucsaKMggJeGaU",
  
    // icons
    shareIcon: "share-alt",
    vistedIcon: "building", //check
    notVisitedIcon: "building-o",
    mapIcon: "map",
    noteIcon: "sticky-note",
  
    //drawerWidth
    drawerWidth: ScreenWidth*0.69,
  
    //BaseUnit
    baseUnit: 16,
  
    //colors
    colorWhite: "#ffffff",
    colorBlack: "#000000",
    colorMain: "#055AA4",
    colorActive: "#cc0000",
    colorLightGray: "#cccccc",
    colorDarkGray: "#333333",
    colorSeperatorColor: "rgba(0, 0, 0, 0.1)",
    colorDrawerIsActiveBackgroundColor: "rgba(0, 0, 0, 0.3)",
    colorDrawerSeperatorBackgroundColor: "rgba(0, 0, 0, 0.1)",
  
    //fonts
    fontMain: "OpenSans-Regular",
    fontSub: "GothamNarrow-Book",
    fontHeadline: fontHeadline,
    fontText: "frutigerweb",
  
    //labels
    labelNewsList: "Nachrichten",
    labelLocationList: "Locations",
    labelNotesList: "Notes",
    labelGalleryList: "Mediathek",
    labelUpload: "Direktmelder",
    labelSettings: "Einstellungen",
    labelAccount: "Benutzerkonto",
    labelImprint: "Impressum",
    labelPrivacyPolicy: "Datenschutz",
    labelBookmarks: "Lesezeichen",
    labelEmail: "E-Mail",
    labelPhone: "Telefon-Nummer",
    labelPassword: "Passwort",
    labelTermsofuse: "Nutzungsbedingungen gelesen?",
    labelSubmit: "Absenden",
  
    labelDelete: "Löschen",
    labelCancel: "Abbrechen",
    labelHome: "Home",
    labelTimeTable: "TimeTable",
    labeleTraining: "Training",
    labelPushnotifications: "Push-Nachrichten aktivieren?",
    labelFontsize: "Schriftgröße",
  
    labelLoginButton: "Anmelden",
    labelLogoutButton: "Abmelden",
    labelForgotPassword: "Passwort vergessen?",
  
    labelSelectPhoto: "Foto auswählen",
    labelSelectSource: "Bitte wählen Sie eine Fotoquelle",
    labelFromCamera: "Kamera",
    labelFromLib: "Album",
    labelMsg: "Nachricht",
  
    //text
    textDownloadAllreadRunning: "Bitte warten Sie bis der aktuelle Download abgeschlossen ist.",
    textNoIssueSelected: "Es wurde keine Ausgabe ausgewählt",
    textDeleteIssues: "Ausgabe löschen",
    //textComfirmDeleteIssues: "Are you sure you want to delete these"+${this.state.deletedIssues.length}+"issues",
    textPushnotificationsHeadline: "Push-Nachrichten",
    textPushnotifications: "Über unsere Push-Nachrichten werden Sie direkt über neue Ereignisse informiert. Sie können diesen Service jederzeit aktivieren oder deaktiveren.",
    textFontsizeHeadline: "Nachrichten Schriftgröße",
    textFontsize: "Hier können Sie die Schriftgröße nach Ihren Bedürfnissen anpassen.",
  
    textLogin: "Anmelden",
    textLoginFollowup: "Um auf unsere DigitalPlus-Inhalte zugreifen zu können, melden Sie sich bitte mit Ihrem Nutzerkonto an.",
    textLogout: "Sie sind angemeldet!",
    textLogutFollowup: "Sie können auf alle DigitalPlus-Inhalte zugreifen.",
    textErrorLogin: "Es ist ein Fehler aufgetreten. Überprüfen Sie Ihre Eingabe.",
  
    textInstantNewsHeadline: "Direktmelder",
    textInstantNews: "Etwas Spannendes ist passiert und Sie sind mittendrin? Schicken Sie unsere Redaktion direkt einen Hinweis!",
  
    textDownloadbyManager: "wird heruntergeladen.",
    textDownloadError: "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.",
  
    htmlUpload: htmlContentUpload,
    htmlImpress: htmlContentImpress,
    htmlPrivacyPolicy: htmlContentPrivacyPolicy,
  
  }
  import store from 'react-native-simple-store';
  const getAppConstants = async (obj)=>{
    obj.baseUnit = await store.get('BASE_UNIT') || 18;
  }
  getAppConstants(APP_CONSTANTS);
  module.exports = APP_CONSTANTS;