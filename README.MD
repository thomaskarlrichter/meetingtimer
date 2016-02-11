# Meetingstimer

Die Meetingtimer-App dient als "Eieruhr" um die Redezeit z.B. in einem
Google-Hangout zu begrenzen.
Sie verfügt weiterhin über eine Redner-Liste und lässt sich von einer
Person administrieren.
Das Zeitsignal der Uhr wird über ein Document in einer Meteor.Collection
synchronisiert.
Der Benutzer kann sich ein Account ohne Email-Verifizierung anlegen.
Dieses Account dient zur Anzeige des Nutzernamens im Timer.
Ist der Meetingtimer bereit (nicht laufend) kann jeder Teilnehmer den
Startbutton betätigen. Sobald ein Teilnehmer A den Startbutton betätigt
hat, übernimmt er die Uhr und bei den anderen Teilnehmern wird angezeigt
das Teilnehmer As Zeit läuft. ausserdem wird der Startbutton bei den
anderen Teilnehmern für diese Zeit deaktiviert.

## Funktionen

- jeder Teilnehmer einer Gruppe kann einen Timer starten,
  wenn kein anderer Teilnehmer gerade einen Timer laufen hat.

- der Ablauf der abgelaufenen Timer wird
  in einer Liste geloggt

- Man kann sich zu einem Betrag melden
  und wird daraufhin in eine Warteliste aufgenommen

## Admin

der Administrator (der die Gruppe eingerichtet hat) kann
- die Warteliste editieren,
- die Länge des Redebeitrages definieren
- umordnen,
- löschen,
- Beiträge unterbrechen
