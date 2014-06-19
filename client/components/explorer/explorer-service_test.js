/**
 * @fileoverview Tests for the explorerService service.
 * @author joemu@google.com (Joe Allan Muharsky)
 */

goog.require('p3rf.dashkit.explorer.application.module');
goog.require('p3rf.dashkit.explorer.components.dashboard.DashboardService');
goog.require('p3rf.dashkit.explorer.components.explorer.ExplorerService');
goog.require('p3rf.dashkit.explorer.components.widget.WidgetFactoryService');
goog.require('p3rf.dashkit.explorer.models.ChartWidgetConfig');
goog.require('p3rf.dashkit.explorer.models.ResultsDataStatus');
goog.require('p3rf.dashkit.explorer.models.WidgetConfig');
goog.require('p3rf.dashkit.explorer.models.dashkit_simple_builder.QueryBuilderService');


describe('explorerService', function() {
  var explorer = p3rf.dashkit.explorer;
  var ChartWidgetConfig = explorer.models.ChartWidgetConfig;
  var QueryBuilderService =
      explorer.models.dashkit_simple_builder.QueryBuilderService;
  var ResultsDataStatus = explorer.models.ResultsDataStatus;
  var WidgetConfig = explorer.models.WidgetConfig;
  var svc;
  var dashboardService;
  var queryBuilderService;
  var widgetFactoryService;

  var mockQuery = 'mock query';

  beforeEach(module('explorer'));

  beforeEach(inject(function(explorerService, $httpBackend,
      _dashboardService_, _queryBuilderService_, _widgetFactoryService_) {
        svc = explorerService;
        dashboardService = _dashboardService_;
        queryBuilderService = _queryBuilderService_;
        widgetFactoryService = _widgetFactoryService_;
        httpBackend = $httpBackend;
      }));

  it('should initialize the appropriate objects.', function() {
    expect(svc.model).not.toBeNull();
  });

  describe('listDashboard', function() {

    it('should fetch a list of dashboards and put them in the scope.',
        function() {
          expect(svc.model.dashboards.length).toEqual(0);

          mockData = {
            'data': [
              {'title': 'foo', 'id': '1'}
            ]
          };

          var query = '/dashboard/list?mine=true';
          httpBackend.expectPOST(query).respond(mockData);

          svc.listDashboards();
          httpBackend.flush();

          expect(svc.model.dashboards.length).toEqual(
              mockData.data.length);
        }
    );

    it('should empty the list when no dashboards are returned.',
        function() {
          expect(svc.model.dashboards.length).toEqual(0);

          mockData = {
            'data': []
          };

          var query = '/dashboard/list?mine=true';
          httpBackend.expectPOST(query).respond(mockData);

          svc.listDashboards();
          httpBackend.flush();

          expect(svc.model.dashboards.length).toEqual(0);
        }
    );

    it('should empty the list when no data is returned.',
        function() {
          expect(svc.model.dashboards.length).toEqual(0);

          mockData = {};

          var query = '/dashboard/list?mine=true';
          httpBackend.expectPOST(query).respond(mockData);

          svc.listDashboards();
          httpBackend.flush();

          expect(svc.model.dashboards.length).toEqual(0);
        }
    );
  });


  describe('customizeSql', function() {

    it('should update the query and state of the selected widget\'s ' +
       'datasource.',
        function() {
          var getSqlFunction = QueryBuilderService.prototype.getSql;
          try {
            QueryBuilderService.prototype.getSql = function() {
              return mockQuery; };

            var boundWidget = new ChartWidgetConfig(widgetFactoryService);
            boundWidget.state().datasource.status = ResultsDataStatus.NODATA;
            dashboardService.selectedWidget = boundWidget;

            svc.customizeSql();

            expect(boundWidget.model.datasource.query).toEqual(mockQuery);
            expect(boundWidget.state().datasource.status).
                toEqual(ResultsDataStatus.NODATA);
          } finally {
            QueryBuilderService.prototype.getSql = getSqlFunction;
          }
        }
    );

    it('should raise an error if there is no selected widget.',
        function() {
          expect(function() {
            svc.customizeSql();
          }).toThrow(new Error('No selected widget.'));
        }
    );

    it('should raise an error if the selected widget doesn\'t have a ' +
       'datasource property.',
        function() {
          expect(function() {
            dashboardService.selectedWidget =
                new WidgetConfig(widgetFactoryService);
            svc.customizeSql();
          }).toThrow(new Error(
         'Selected widget doesn\'t have a datasource property.'));
        }
    );
  });
});